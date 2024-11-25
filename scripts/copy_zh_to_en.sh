#!/bin/bash

# Define source and destination directories
SRC_DIR="./src/content/docs/zh-cn/main-works/unified-field-theory"
DEST_DIR="./src/content/docs/en/main-works/unified-field-theory"

# Create destination directory if it doesn't exist
mkdir -p "$DEST_DIR"

# # Process section-0 through section-23
# for i in {0..23}; do
#   file="section-${i}.mdx"

# Process every file in the source directory
for file in $(ls "$SRC_DIR"); do
  
  # 判断文件末尾是否为 "敬请期待...", 如果是则不处理
  if [[ $(tail -n 1 "$SRC_DIR/$file") == "敬请期待..." ]]; then
    continue
  fi

  # Copy file from source to destination
  cp "$SRC_DIR/$file" "$DEST_DIR/$file"
  
  # Create a temporary file
  temp_file=$(mktemp)
  
  # Split the file: head (lines 1-5), insert message, and append rest of file
  head -n 5 "$DEST_DIR/$file" > "$temp_file"
  printf "\n:::caution[Caution]\nThis content is not yet supported in your language.\n:::\n" >> "$temp_file"
  tail -n +6 "$DEST_DIR/$file" >> "$temp_file"
  
  # Replace original file with modified version
  mv "$temp_file" "$DEST_DIR/$file"
done