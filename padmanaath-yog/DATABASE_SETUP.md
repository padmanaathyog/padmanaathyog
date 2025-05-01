# Database Setup for Yoga Website

This document provides instructions for setting up the database for the Yoga Website project.

## Prerequisites

- Supabase account
- Supabase CLI installed (optional, for local development)

## Setup Instructions

### Option 1: Using the Supabase Dashboard

1. Create a new Supabase project from the dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `scripts/create-database.sql` and paste it into the SQL Editor
4. Run the SQL script to create all necessary tables and policies

### Option 2: Using the Supabase CLI

1. Install the Supabase CLI if you haven't already:
   \`\`\`bash
   npm install -g supabase
   \`\`\`

2. Initialize Supabase locally:
   \`\`\`bash
   supabase init
   \`\`\`

3. Start the local Supabase instance:
   \`\`\`bash
   supabase start
   \`\`\`

4. Run the SQL script:
   \`\`\`bash
   supabase db execute < scripts/create-database.sql
   \`\`\`

5. Link your local project to your remote Supabase project:
   \`\`\`bash
   supabase link --project-ref your-project-ref
   \`\`\`

6. Push the local schema to your remote project:
   \`\`\`bash
   supabase db push
   \`\`\`

## Storage Setup

After setting up the database tables, you need to create a storage bucket for media uploads:

1. Go to the Storage section in your Supabase dashboard
2. Create a new bucket named `yoga
