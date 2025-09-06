#!/usr/bin/env node

/**
 * Script to automatically fix hydration issues in a Next.js project
 * This script scans for common patterns that cause hydration mismatches
 */

const fs = require('fs');
const path = require('path');

// List of files to check and potentially modify
const COMPONENT_FILES = [
  'components/ui/button.tsx',
  'components/ui/input.tsx',
  'components/ui/textarea.tsx',
  'components/ui/label.tsx',
  'components/ui/card.tsx',
  'components/ui/dropdown-menu.tsx',
  'components/ui/accordion.tsx',
  'components/ui/navigation-menu.tsx',
  'app/components/HeroSlider.tsx',
  'app/components/ContactCardForm.tsx',
  'app/components/ContactSection.tsx',
  'app/components/FeatureSection.tsx',
  'app/components/AboutUs.tsx',
  'app/components/GalleryServer.tsx',
  'app/components/SectorsSection.tsx',
];

// Patterns to look for that might cause hydration issues
const HYDRATION_PATTERNS = [
  {
    name: 'fdprocessedid',
    regex: /\bfdprocessedid\s*=\s*['"`][^'"`]*['"`]/g,
    replacement: '',
    description: 'Form processing ID that changes between server and client'
  },
  {
    name: 'Date.now',
    regex: /Date\.now\(\)/g,
    replacement: 'typeof window !== "undefined" ? Date.now() : 0',
    description: 'Server/client timestamp mismatch'
  },
  {
    name: 'Math.random',
    regex: /Math\.random\(\)/g,
    replacement: 'typeof window !== "undefined" ? Math.random() : 0.5',
    description: 'Random value that differs between server and client'
  },
  {
    name: 'window object',
    regex: /window\./g,
    replacement: 'typeof window !== "undefined" ? window.',
    description: 'Direct window access without server check'
  },
  {
    name: 'document object',
    regex: /document\./g,
    replacement: 'typeof document !== "undefined" ? document.',
    description: 'Direct document access without server check'
  },
  {
    name: 'navigator object',
    regex: /navigator\./g,
    replacement: 'typeof navigator !== "undefined" ? navigator.',
    description: 'Direct navigator access without server check'
  }
];

/**
 * Check if a file exists and return its path
 */
function getFilePath(basePath, file) {
  const fullPath = path.join(basePath, file);
  return fs.existsSync(fullPath) ? fullPath : null;
}

/**
 * Read a file and return its content
 */
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Write content to a file
 */
function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Check for hydration issues in a file
 */
function checkFileForHydrationIssues(filePath, content) {
  const issues = [];
  
  for (const pattern of HYDRATION_PATTERNS) {
    const matches = content.match(pattern.regex);
    if (matches) {
      issues.push({
        pattern: pattern.name,
        matches: matches.length,
        description: pattern.description,
        regex: pattern.regex
      });
    }
  }
  
  return issues;
}

/**
 * Fix hydration issues in a file
 */
function fixHydrationIssuesInFile(filePath, content) {
  let modifiedContent = content;
  let modifications = 0;
  
  for (const pattern of HYDRATION_PATTERNS) {
    const originalContent = modifiedContent;
    modifiedContent = modifiedContent.replace(pattern.regex, pattern.replacement);
    
    if (originalContent !== modifiedContent) {
      modifications++;
    }
  }
  
  return {
    content: modifiedContent,
    modifications: modifications
  };
}

/**
 * Main function to check and fix hydration issues
 */
function main() {
  const basePath = process.cwd();
  const projectRoot = path.join(basePath, 'ashisuto-tech');
  
  console.log('Checking for hydration issues...\n');
  
  let totalFilesChecked = 0;
  let totalFilesWithIssues = 0;
  let totalIssuesFound = 0;
  let totalFilesModified = 0;
  
  // Check each file
  for (const file of COMPONENT_FILES) {
    const filePath = getFilePath(projectRoot, file);
    
    if (!filePath) {
      console.log(`\x1b[33mSkipping ${file} - file not found\x1b[0m`);
      continue;
    }
    
    totalFilesChecked++;
    const content = readFile(filePath);
    
    if (!content) {
      continue;
    }
    
    const issues = checkFileForHydrationIssues(filePath, content);
    
    if (issues.length > 0) {
      totalFilesWithIssues++;
      totalIssuesFound += issues.length;
      
      console.log(`\x1b[31mIssues found in ${file}:\x1b[0m`);
      
      for (const issue of issues) {
        console.log(`  - ${issue.pattern}: ${issue.matches} occurrences (${issue.description})`);
      }
      
      // Ask if we should fix the issues
      const fixResult = fixHydrationIssuesInFile(filePath, content);
      
      if (fixResult.modifications > 0) {
        console.log(`\x1b[32mFixed ${fixResult.modifications} issues in ${file}\x1b[0m`);
        
        if (writeFile(filePath, fixResult.content)) {
          totalFilesModified++;
        } else {
          console.log(`\x1b[31mFailed to write fixes to ${file}\x1b[0m`);
        }
      }
    } else {
      console.log(`\x1b[32mNo hydration issues found in ${file}\x1b[0m`);
    }
  }
  
  console.log('\nSummary:');
  console.log(`Files checked: ${totalFilesChecked}`);
  console.log(`Files with issues: ${totalFilesWithIssues}`);
  console.log(`Total issues found: ${totalIssuesFound}`);
  console.log(`Files modified: ${totalFilesModified}`);
  
  if (totalFilesModified > 0) {
    console.log('\x1b[32mSuccessfully fixed hydration issues!\x1b[0m');
  } else {
    console.log('\x1b[32mNo issues were found or fixed.\x1b[0m');
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  checkFileForHydrationIssues,
  fixHydrationIssuesInFile,
  HYDRATION_PATTERNS,
  COMPONENT_FILES
};