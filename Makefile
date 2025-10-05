.PHONY: serve stop clean help

# Default port for the development server
PORT ?= 8910

# Start the development server
serve:
	@echo "Starting development server on port $(PORT)..."
	@echo "Open http://localhost:$(PORT) in your browser"
	@python3 -m http.server $(PORT)

# Stop the development server
stop:
	@echo "Stopping development server on port $(PORT)..."
	@lsof -ti:$(PORT) | xargs kill -9 2>/dev/null || echo "No server running on port $(PORT)"

# Clean up any temporary files
clean:
	@echo "Cleaning up..."
	@find . -type f -name "*.pyc" -delete
	@find . -type d -name "__pycache__" -delete
	@find . -type f -name ".DS_Store" -delete

# Show help
help:
	@echo "Mars Launchpad - Development Server"
	@echo ""
	@echo "Available targets:"
	@echo "  make serve    - Start development server (default port: 8910)"
	@echo "  make stop     - Stop development server"
	@echo "  make clean    - Clean up temporary files"
	@echo "  make help     - Show this help message"
	@echo ""
	@echo "Custom port:"
	@echo "  make serve PORT=3000"
