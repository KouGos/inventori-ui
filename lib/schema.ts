// This file defines the database schema for Supabase

/*
Table: chats
- id: uuid (primary key)
- user_id: string (foreign key to users table)
- title: string
- initial_prompt: text
- created_at: timestamp
- updated_at: timestamp

Table: messages
- id: uuid (primary key)
- chat_id: uuid (foreign key to chats table)
- role: string (enum: 'system', 'user', 'assistant')
- content: text
- created_at: timestamp

Table: research_papers
- id: uuid (primary key)
- user_id: string (foreign key to users table)
- title: string
- authors: string
- journal: string
- publication_date: date
- abstract: text
- url: string
- file_path: string
- created_at: timestamp

Table: research_collections
- id: uuid (primary key)
- user_id: string (foreign key to users table)
- name: string
- description: text
- created_at: timestamp

Table: collection_items
- id: uuid (primary key)
- collection_id: uuid (foreign key to research_collections table)
- item_type: string (enum: 'paper', 'chat', 'note')
- item_id: uuid
- created_at: timestamp
*/

// SQL to create these tables:
/*
-- Enable RLS
alter table public.chats enable row level security;
alter table public.messages enable row level security;
alter table public.research_papers enable row level security;
alter table public.research_collections enable row level security;
alter table public.collection_items enable row level security;

-- Create policies
create policy "Users can view their own chats"
  on chats for select
  using (auth.uid() = user_id);

create policy "Users can insert their own chats"
  on chats for insert
  with check (auth.uid() = user_id);

create policy "Users can view messages in their chats"
  on messages for select
  using (chat_id in (select id from chats where user_id = auth.uid()));

create policy "Users can insert messages in their chats"
  on messages for insert
  with check (chat_id in (select id from chats where user_id = auth.uid()));
*/
