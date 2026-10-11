# Endix coverage report

Public coverage report for each Endix edition. Served by GitHub Pages from `index.html`.

## Daily update
1. Read the Google Sheet "Endix X-statistik (@Endix_Expo)" (`1Sk97t56KJcBACxyPRATpDeC4Qk1fzZZMfXH6dqjHFCg`) with
   spreadsheets.get, includeGridData=true, fields `sheets.properties.title,sheets.data.rowData.values.formattedValue`, ranges:
   Press, Press_Feed, YT_Videos, TikTok, Instagram, Endix Spring 2026, Endix Fall 2026, Editions, Press_Manual, Links_Manual, Webb_Kommentarer_Publik, Exhibitors
   (plus the Grok tab of any new edition). Save the JSON as `data/sheet_dump.json` (not committed).
2. `python3 tools/build_data.py` → `data/report_data.json`
3. Review new items (noise, Endix's own accounts, trailer reuploads) and extend the CONFIG lists in `tools/build_data.py`.
4. `python3 tools/build_page.py` → `index.html`
5. Commit and push.

## New edition
Add a row to the sheet's Editions tab, then add the edition's static numbers (aftermovie, Grok X tab, Twitch, Steam) to CONFIG in `tools/build_data.py`.
