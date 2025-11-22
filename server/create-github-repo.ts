#!/usr/bin/env tsx

import { getGitHubClient } from './github-client';

async function createRepository() {
  try {
    console.log('🔗 Connecting to GitHub...\n');
    
    const octokit = await getGitHubClient();
    
    // Get authenticated user info
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`✅ Connected as: ${user.login}\n`);
    
    // Repository details
    const repoName = 'unglued-food';
    const description = 'A gluten-free food blog and recipe website with 791+ AI-generated recipes. Full-stack web application with React, Express, PostgreSQL, and SEO-optimized static site generation.';
    
    console.log('📦 Creating repository...');
    console.log(`   Name: ${repoName}`);
    console.log(`   Description: ${description}\n`);
    
    // Create the repository
    const { data: repo } = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      description: description,
      private: false, // Change to true if you want it private
      auto_init: false, // We'll push our existing code
    });
    
    console.log('✅ Repository created successfully!\n');
    console.log('📍 Repository URL:', repo.html_url);
    console.log('🔗 Git URL:', repo.clone_url);
    console.log('\n📋 Next steps:\n');
    console.log('1. Initialize git in your project (if not already done):');
    console.log('   git init\n');
    console.log('2. Add all your files:');
    console.log('   git add .\n');
    console.log('3. Create your first commit:');
    console.log('   git commit -m "Initial commit: Unglued Food - Gluten-free recipe website"\n');
    console.log('4. Add the remote repository:');
    console.log(`   git remote add origin ${repo.clone_url}\n`);
    console.log('5. Push your code:');
    console.log('   git push -u origin main\n');
    
    return repo;
  } catch (error: any) {
    if (error.status === 422) {
      console.error('\n❌ Repository already exists!');
      console.error('   Try using a different name or delete the existing repository first.\n');
    } else {
      console.error('\n❌ Error creating repository:', error.message);
    }
    throw error;
  }
}

createRepository().catch(console.error);
