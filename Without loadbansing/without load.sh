#!/bin/bash

# =====================================================================
# React E-Commerce Project Deployment Automation Script
# =====================================================================
# This script automates the entire deployment process for the
# React E-Commerce project on a fresh Ubuntu EC2 instance.
# 
# Usage: 
# 1. Create a new EC2 instance with Ubuntu
# 2. SSH into the instance
# 3. Copy this script to the instance
# 4. Make it executable: chmod +x deploy-ecommerce-automation.sh
# 5. Run it: ./deploy-ecommerce-automation.sh
# =====================================================================

# Set error handling
set -e
set -o pipefail

# Text colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print section headers
print_section() {
    echo -e "\n${BLUE}===========================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}===========================================================${NC}\n"
}

# Function to print success messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Function to print error messages
print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Function to print info messages
print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Function to check if command was successful
check_success() {
    if [ $? -eq 0 ]; then
        print_success "$1"
    else
        print_error "$2"
        exit 1
    fi
}

# Get the public IP address of the EC2 instance
get_public_ip() {
    PUBLIC_IP=$(curl -s http://checkip.amazonaws.com)
    check_success "Retrieved public IP: $PUBLIC_IP" "Failed to retrieve public IP"
    echo $PUBLIC_IP
}

# =====================================================================
# STEP 1: Update system and install dependencies
# =====================================================================
install_dependencies() {
    print_section "STEP 1: Updating system and installing dependencies"
    
    print_info "Updating package lists..."
    sudo apt-get update
    check_success "Package lists updated" "Failed to update package lists"
    
    print_info "Installing required packages..."
    sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    check_success "Required packages installed" "Failed to install required packages"
    
    print_info "Adding Docker's official GPG key..."
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    check_success "Docker GPG key added" "Failed to add Docker GPG key"
    
    print_info "Setting up Docker repository..."
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    check_success "Docker repository added" "Failed to add Docker repository"
    
    print_info "Updating package lists with Docker repository..."
    sudo apt-get update
    check_success "Package lists updated with Docker repository" "Failed to update package lists"
    
    print_info "Installing Docker CE..."
    sudo apt-get install -y docker-ce
    check_success "Docker CE installed" "Failed to install Docker CE"
    
    print_info "Adding current user to docker group..."
    sudo usermod -aG docker $USER
    check_success "User added to docker group" "Failed to add user to docker group"
    
    print_info "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    check_success "Docker Compose installed" "Failed to install Docker Compose"
    
    print_success "All dependencies installed successfully"
}

# =====================================================================
# STEP 2: Create project directory structure
# =====================================================================
create_project_structure() {
    print_section "STEP 2: Creating project directory structure"
    
    print_info "Creating application directory..."
    mkdir -p ~/react-ecommerce-app/nginx
    check_success "Application directory created" "Failed to create application directory"
    
    print_success "Project directory structure created successfully"
}

# =====================================================================
# STEP 3: Create Docker Compose configuration
# =====================================================================
create_docker_compose() {
    print_section "STEP 3: Creating Docker Compose configuration"
    
    print_info "Creating docker-compose.yml file..."
    cat > ~/react-ecommerce-app/docker-compose.yml << 'EOL'
version: '3'

services:
  frontend:
    image: kosaladeshan/react-ecommerce-frontend:latest
    ports:
      - "80:80"
    depends_on:
      - backend1
      - backend2
    networks:
      - app-network

  backend1:
    image: kosaladeshan/react-ecommerce-backend1:latest
    ports:
      - "8081:80"
    depends_on:
      - database
    networks:
      - app-network

  backend2:
    image: kosaladeshan/react-ecommerce-backend2:latest
    ports:
      - "8082:80"
    depends_on:
      - database
    networks:
      - app-network

  database:
    image: kosaladeshan/react-ecommerce-database:latest
    ports:
      - "5432:5432"
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - app-network

  nginx-lb:
    image: kosaladeshan/react-ecommerce-nginx-lb:latest
    ports:
      - "8080:8080"
    depends_on:
      - frontend
      - backend1
      - backend2
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  db-data:
EOL
    check_success "docker-compose.yml file created" "Failed to create docker-compose.yml file"
    
    print_success "Docker Compose configuration created successfully"
}

# =====================================================================
# STEP 4: Create Nginx configuration
# =====================================================================
create_nginx_config() {
    print_section "STEP 4: Creating Nginx configuration"
    
    print_info "Creating nginx.conf file..."
    cat > ~/react-ecommerce-app/nginx/nginx.conf << 'EOL'
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    upstream backend {
        server backend1:80;
        server backend2:80;
    }

    server {
        listen 8080;
        
        location / {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
EOL
    check_success "nginx.conf file created" "Failed to create nginx.conf file"
    
    print_success "Nginx configuration created successfully"
}

# =====================================================================
# STEP 5: Create health check file for backend servers
# =====================================================================
create_health_check() {
    print_section "STEP 5: Creating health check file for backend servers"
    
    print_info "Creating health.php file..."
    cat > ~/health.php << 'EOL'
<?php
// Return a JSON response with server information
header('Content-Type: application/json');
echo json_encode([
    'status' => 'healthy',
    'timestamp' => time(),
    'service' => 'backend',
    'server' => gethostname() // This will return the container hostname
]);
?>
EOL
    check_success "health.php file created" "Failed to create health.php file"
    
    print_success "Health check file created successfully"
}

# =====================================================================
# STEP 6: Pull Docker images and deploy the application
# =====================================================================
deploy_application() {
    print_section "STEP 6: Pulling Docker images and deploying the application"
    
    print_info "Changing to application directory..."
    cd ~/react-ecommerce-app
    check_success "Changed to application directory" "Failed to change to application directory"
    
    print_info "Pulling Docker images (this may take some time)..."
    sudo docker-compose pull
    check_success "Docker images pulled successfully" "Failed to pull Docker images"
    
    print_info "Starting the application..."
    sudo docker-compose up -d
    check_success "Application started successfully" "Failed to start application"
    
    print_info "Waiting for containers to initialize (30 seconds)..."
    sleep 30
    
    print_info "Updating health check files in backend containers..."
    sudo docker cp ~/health.php react-ecommerce-app-backend1-1:/var/www/html/health.php
    sudo docker cp ~/health.php react-ecommerce-app-backend2-1:/var/www/html/health.php
    check_success "Health check files updated in backend containers" "Failed to update health check files"
    
    print_success "Application deployed successfully"
}

# =====================================================================
# STEP 7: Configure firewall
# =====================================================================
configure_firewall() {
    print_section "STEP 7: Configuring firewall"
    
    print_info "Installing UFW (Uncomplicated Firewall)..."
    sudo apt-get install -y ufw
    check_success "UFW installed" "Failed to install UFW"
    
    print_info "Configuring firewall rules..."
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    sudo ufw allow 22/tcp
    sudo ufw allow 80/tcp
    sudo ufw allow 8080/tcp
    sudo ufw allow 8081/tcp
    sudo ufw allow 8082/tcp
    
    print_info "Enabling firewall..."
    echo "y" | sudo ufw enable
    check_success "Firewall enabled" "Failed to enable firewall"
    
    print_info "Firewall status:"
    sudo ufw status
    
    print_success "Firewall configured successfully"
}

# =====================================================================
# STEP 8: Create load balancing test script (but don't run it)
# =====================================================================
create_load_balancing_test() {
    print_section "STEP 8: Creating load balancing test script (for optional use)"
    
    print_info "Creating load balancing test script..."
    cat > ~/test-load-balancing.sh << 'EOL'
#!/bin/bash

# Test script to verify load balancing
echo "Testing load balancing for backend API..."
echo "Making 10 requests to the health endpoint..."
echo ""

for i in {1..10}; do
    echo "Request $i:"
    # Add a custom header to identify the request
    response=$(curl -s -H "X-Test-Request: $i" http://localhost:8080/health.php)
    echo "Response: $response"
    
    # Extract the server information if available
    if [[ $response == *"server"* ]]; then
        server=$(echo $response | grep -o '"server":"[^"]*"')
        echo "Server: $server"
    fi
    
    echo ""
    # Add a small delay between requests
    sleep 1
done

echo "Load balancing test completed."
EOL
    chmod +x ~/test-load-balancing.sh
    check_success "Load balancing test script created" "Failed to create load balancing test script"
    
    print_info "The load balancing test script has been created but not executed."
    print_info "You can run it manually later with: ~/test-load-balancing.sh"
    
    print_success "Load balancing test script created successfully"
}

# =====================================================================
# STEP 9: Create verification script
# =====================================================================
create_verification_script() {
    print_section "STEP 9: Creating verification script"
    
    print_info "Creating verification script..."
    cat > ~/verify-deployment.sh << 'EOL'
#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Get public IP
PUBLIC_IP=$(curl -s http://checkip.amazonaws.com)

echo -e "${YELLOW}Verifying React E-Commerce Deployment${NC}"
echo -e "${YELLOW}======================================${NC}"

# Check if containers are running
echo -e "\n${YELLOW}Checking container status:${NC}"
CONTAINERS_RUNNING=$(sudo docker-compose -f ~/react-ecommerce-app/docker-compose.yml ps --services --filter "status=running" | wc -l)
if [ "$CONTAINERS_RUNNING" -eq 5 ]; then
    echo -e "${GREEN}✓ All containers are running${NC}"
else
    echo -e "${RED}✗ Not all containers are running. Expected 5, found $CONTAINERS_RUNNING${NC}"
    echo -e "\nDetailed container status:"
    sudo docker-compose -f ~/react-ecommerce-app/docker-compose.yml ps
fi

# Check frontend access
echo -e "\n${YELLOW}Checking frontend access:${NC}"
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:80)
if [ "$FRONTEND_STATUS" -eq 200 ]; then
    echo -e "${GREEN}✓ Frontend is accessible (HTTP 200)${NC}"
    echo -e "${GREEN}  URL: http://$PUBLIC_IP${NC}"
else
    echo -e "${RED}✗ Frontend is not accessible. Status code: $FRONTEND_STATUS${NC}"
fi

# Check backend access
echo -e "\n${YELLOW}Checking backend API access:${NC}"
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/health.php)
if [ "$BACKEND_STATUS" -eq 200 ]; then
    echo -e "${GREEN}✓ Backend API is accessible (HTTP 200)${NC}"
    echo -e "${GREEN}  URL: http://$PUBLIC_IP:8080${NC}"
else
    echo -e "${RED}✗ Backend API is not accessible. Status code: $BACKEND_STATUS${NC}"
fi

echo -e "\n${YELLOW}Deployment verification completed.${NC}"
echo -e "${YELLOW}Your React E-Commerce application is available at:${NC}"
echo -e "${GREEN}Frontend: http://$PUBLIC_IP${NC}"
echo -e "${GREEN}Backend API: http://$PUBLIC_IP:8080${NC}"
echo -e "\n${YELLOW}Note:${NC} To test load balancing, run: ~/test-load-balancing.sh"
EOL
    chmod +x ~/verify-deployment.sh
    check_success "Verification script created" "Failed to create verification script"
    
    print_success "Verification script created successfully"
}

# =====================================================================
# STEP 10: Print deployment summary
# =====================================================================
print_deployment_summary() {
    print_section "STEP 10: Deployment Summary"
    
    PUBLIC_IP=$(get_public_ip)
    
    echo -e "${GREEN}React E-Commerce Project Deployment Completed Successfully!${NC}"
    echo -e "\n${YELLOW}Access Your Application:${NC}"
    echo -e "${GREEN}Frontend: http://$PUBLIC_IP${NC}"
    echo -e "${GREEN}Backend API: http://$PUBLIC_IP:8080${NC}"
    
    echo -e "\n${YELLOW}Useful Commands:${NC}"
    echo -e "${BLUE}Check container status:${NC} cd ~/react-ecommerce-app && sudo docker-compose ps"
    echo -e "${BLUE}View container logs:${NC} cd ~/react-ecommerce-app && sudo docker-compose logs -f"
    echo -e "${BLUE}Restart containers:${NC} cd ~/react-ecommerce-app && sudo docker-compose restart"
    echo -e "${BLUE}Stop containers:${NC} cd ~/react-ecommerce-app && sudo docker-compose down"
    echo -e "${BLUE}Start containers:${NC} cd ~/react-ecommerce-app && sudo docker-compose up -d"
    echo -e "${BLUE}Test load balancing:${NC} ~/test-load-balancing.sh"
    echo -e "${BLUE}Verify deployment:${NC} ~/verify-deployment.sh"
    
    echo -e "\n${YELLOW}Note:${NC} If you're accessing the application from a browser and see the Nginx welcome page,"
    echo -e "try clearing your browser cache or use incognito/private browsing mode."
    
    echo -e "\n${YELLOW}Load Balancing Test:${NC}"
    echo -e "A load balancing test script has been created but was not executed automatically."
    echo -e "You can run it manually with: ${BLUE}~/test-load-balancing.sh${NC}"
    
    echo -e "\n${GREEN}Deployment automation completed successfully!${NC}"
}

# =====================================================================
# Main execution
# =====================================================================
main() {
    print_section "Starting React E-Commerce Project Deployment Automation"
    
    # Execute all steps
    install_dependencies
    create_project_structure
    create_docker_compose
    create_nginx_config
    create_health_check
    deploy_application
    configure_firewall
    create_load_balancing_test  # Create but don't run the test
    create_verification_script
    print_deployment_summary
}

# Run the main function
main
