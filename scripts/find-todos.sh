#!/bin/bash

# Simple script to find all TODOs in the codebase and format them as markdown
# Not ideal for a large codebase, but it's a quick way to find all TODOs

# Create or clear the TODO.md file
echo "# TODOs Found in Codebase" > TODO.md
echo "Last updated: $(date)\n" >> TODO.md

# Find all TODOs and format them as markdown
find . -type f \
    -not -path "*/node_modules/*" \
    -not -path "*/scripts/find-todos.sh" \
    -not -path "*/.next/*" \
    -not -path "*/.git/*" \
    -not -path "*/dist/*" \
    -not -path "*/build/*" \
    -exec grep -l "TODO:" {} \; | while read -r file; do
    echo "## File: \`${file#./}\`" >> TODO.md
    echo "" >> TODO.md
    grep -n "TODO:" "$file" | while read -r line; do
        lineNum=$(echo "$line" | cut -d: -f1)
        todo=$(echo "$line" | cut -d: -f2-)
        echo "- Line ${lineNum}:${todo}" >> TODO.md
    done
    echo "" >> TODO.md
done 