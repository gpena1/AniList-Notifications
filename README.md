# How to run the bot
1. Clone and cd into the repository.
2. Create a shellscript named `variables` that declares and exports the following variables: `ANILIST_USER`, `ANILIST_BOT_TOKEN`, `USER_ID`.
3. Install dependencies using `npm i`.
4. Run the start script using `./start.sh`.
5. Stop it at any time by terminating with `ctrl + C`.

# How to make the bot notify you
1. Create a cronjob as specified: `* * * * * user sudo /path/to/repo/query.sh`

`query.sh` is provided in the repository.
