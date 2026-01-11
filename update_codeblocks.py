#!/usr/bin/env python3
"""
Script to replace CodeBlock with LiveCodeEditor or StaticCodeBlock in all Python chapter files.
"""

import re
import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).parent / "app" / "python"

# List of chapters to update
CHAPTERS = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18]

def update_chapter(chapter_num):
    """Update a single chapter file."""
    file_path = BASE_DIR / f"chapter-{chapter_num}" / "page.tsx"

    if not file_path.exists():
        print(f"!  Skipping chapter-{chapter_num}: file not found")
        return False

    print(f"- Processing chapter-{chapter_num}...")

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Track changes
    changes = []

    # 1. Replace CodeBlock import with LiveCodeEditor and StaticCodeBlock
    if "import { CodeBlock }" in content:
        # Check if we need StaticCodeBlock (bash or yaml)
        needs_static = bool(re.search(r'language="(?:bash|yaml)"', content))

        if needs_static:
            new_import = 'import { LiveCodeEditor } from \'@/components/content/LiveCodeEditor\';\nimport { StaticCodeBlock } from \'@/components/content/StaticCodeBlock\';'
        else:
            new_import = 'import { LiveCodeEditor } from \'@/components/content/LiveCodeEditor\';'

        content = content.replace(
            "import { CodeBlock } from '@/components/content/CodeBlock';",
            new_import
        )
        changes.append("+ Updated imports")

    # 2. Replace Python CodeBlocks with LiveCodeEditor
    def replace_python_codeblock(match):
        # Extract the code prop value
        code_match = re.search(r'code=\{([^}]+)\}', match.group(0))
        if code_match:
            code_var = code_match.group(1)
            return f'<LiveCodeEditor\n                initialCode={{{code_var}}}\n            />'
        return match.group(0)

    python_pattern = r'<CodeBlock\s+language="python"[^>]*?(?:code=\{[^}]+\}[^>]*?)(?:output=\{[^}]+\}[^>]*?)?(?:filename="[^"]*"[^>]*?)?(?:dir="[^"]*"[^>]*?)?\s*/>'
    python_count = len(re.findall(python_pattern, content))
    content = re.sub(python_pattern, replace_python_codeblock, content)

    if python_count > 0:
        changes.append(f"+ Replaced {python_count} Python CodeBlocks")

    # 3. Replace Bash/YAML CodeBlocks with StaticCodeBlock
    bash_yaml_pattern = r'<CodeBlock\s+language="(bash|yaml)"'
    bash_yaml_count = len(re.findall(bash_yaml_pattern, content))
    content = re.sub(r'<CodeBlock\s+language="(bash|yaml)"', r'<StaticCodeBlock language="\1"', content)

    if bash_yaml_count > 0:
        changes.append(f"+ Replaced {bash_yaml_count} Bash/YAML CodeBlocks")

    # Save the updated content
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    if changes:
        for change in changes:
            print(f"  {change}")
        return True
    else:
        print(f"  i  No changes needed")
        return False

def main():
    """Main function."""
    print(">> Starting CodeBlock replacement process...\n")

    updated_count = 0
    for chapter in CHAPTERS:
        if update_chapter(chapter):
            updated_count += 1
        print()

    print(f"OK Done! Updated {updated_count}/{len(CHAPTERS)} chapters")

if __name__ == "__main__":
    main()
