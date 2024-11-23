#!/bin/bash

# Define source and destination directories
SRC_DIR="/Users/gaobaoqi/Documents/zxq/uft/unifiedfieldtheory.cn/src/content/docs/zh-cn/main-works/unified-field-theory"
DEST_DIR="/Users/gaobaoqi/Documents/zxq/uft/unifiedfieldtheory.cn/src/content/docs/en/main-works/unified-field-theory"

# Create destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# Process section-0 through section-23
for i in {0..23}; do
  file="section-${i}.mdx"
  
  # Copy file from source to destination
  cp "$SRC_DIR/$file" "$DEST_DIR/$file"
  
  # Create a temporary file
  temp_file=$(mktemp)
  
  # Split the file: head (lines 1-6), insert message, and append rest of file
  head -n 6 "$DEST_DIR/$file" > "$temp_file"
  echo -e "\n:::caution[Caution]\nThis content is not yet supported in your language.\n:::" >> "$temp_file"
  tail -n +7 "$DEST_DIR/$file" >> "$temp_file"
  
  # Replace original file with modified version
  mv "$temp_file" "$DEST_DIR/$file"
done