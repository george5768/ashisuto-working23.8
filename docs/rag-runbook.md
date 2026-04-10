# RAG Runbook

## Prerequisites

- PostgreSQL server reachable from this app
- `pgvector` extension support
- OpenAI API key configured

## Environment Variables

- `OPENAI_API_KEY`
- `OPENAI_CHAT_MODEL` (optional, default `gpt-4o-mini`)
- `OPENAI_EMBEDDING_MODEL` (optional, default `text-embedding-3-small`)
- `DB_USER_APP`
- `DB_PASSWORD_APP`
- `DB_HOST_APP`
- `DB_PORT_APP`
- `DB_NAME_APP`
- `RAG_TOP_K` (optional, default `5`)
- `RAG_MIN_SIMILARITY` (optional, default `0.45`)

## Commands

```bash
npm run rag:migrate
npm run rag:reindex
```

## Runtime

- `/api/chat` will run in `rag` mode when retrieval finds enough context.
- If retrieval is weak, API returns a strict refusal response.


## Notes

- Environment variables must be temporarily hardcoded into the script, as they are not accessible during execution via npm run. Ensure these values are reverted to their proper environment-based configuration after completion.
- If there are any updates to the knowledge base, re-run the indexing process using npm run rag:reindex.