#!/bin/bash

# Country Impact Analyst - Environment Setup Script
# This script helps you set up your .env file interactively

echo "🌍 Country Impact Analyst - Environment Setup"
echo "=============================================="
echo ""

# Check if .env already exists
if [ -f .env ]; then
    echo "⚠️  .env file already exists!"
    read -p "Do you want to overwrite it? (y/n): " overwrite
    if [ "$overwrite" != "y" ]; then
        echo "Setup cancelled."
        exit 0
    fi
fi

echo "This script will help you create your .env file."
echo ""

# Get OpenAI API Key
echo "📝 Please enter your OpenAI API key:"
echo "   (Get one from: https://platform.openai.com/api-keys)"
read -p "API Key: " api_key

if [ -z "$api_key" ]; then
    echo "❌ API key cannot be empty!"
    exit 1
fi

# Get Port (with default)
echo ""
read -p "Enter port for backend server (default: 5000): " port
port=${port:-5000}

# Get Environment
echo ""
echo "Select environment:"
echo "  1) development (default)"
echo "  2) production"
read -p "Choice (1 or 2): " env_choice

if [ "$env_choice" = "2" ]; then
    node_env="production"
else
    node_env="development"
fi

# Create .env file
cat > .env << EOF
# OpenAI Configuration
OPENAI_API_KEY=$api_key

# Server Configuration
PORT=$port
NODE_ENV=$node_env
EOF

echo ""
echo "✅ .env file created successfully!"
echo ""
echo "Your configuration:"
echo "  - API Key: ${api_key:0:20}..."
echo "  - Port: $port"
echo "  - Environment: $node_env"
echo ""
echo "Next steps:"
echo "  1. Run: npm install"
echo "  2. Run: cd client && npm install"
echo "  3. Run: npm run dev"
echo ""
echo "Or use the quick install: npm run install-all"
echo ""
echo "🚀 Ready to analyze countries for humanitarian impact!"

