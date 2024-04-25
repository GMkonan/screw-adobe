## Screw adobe, buy affinity Suite

Quick project.

### Tech

- turso (database)
- resend (email)
- cheerio (scraping)
- vercel (hosting)
- upstash (cronjob)

### Todo

- [x] Add cheerio to check for sale
- [x] Mockup simple UI
- [x] Setup Database (turso)
- [x] Add database calls to api and frontend
  - Seems like we can't have tables with \_ in drizzle sqlite (was getting a bug with "on_sale")
- [x] Setup email notifications
- [x] Create email template Interface
- [x] Remade the design (somewhat)
- [x] Add a way to unsubscribe from email notifications
- [x] check if schema has email as unique
- [x] tidy up route api code and handle sending emails only when there is a sale
- [x] Add footer
- [x] Deploy to vercel
- [x] Some more visual tinkering (both email and UI)
- [ ] Cleanup README
- [ ] Setup cronjob to check for sale (upstash?)
- [ ] open graph stuff
- [ ] Add toast or something to show you subscribed (maybe not, lazy)

### About scraping

Checking for a "s" (sale) tag in [this url](https://affinity.serif.com/affinity-pricing/) using [cheerio](https://github.com/cheeriojs/cheerio)

If anyone has a better way to check for sale, please let me know! I just went with the first one that came to my mind.

#### Stuff to check sale

```html
<s class="u-self-start u-text-boulder u-text-gamma u-strikethrough-sale u-lh-1">
  US$&nbsp;164,99
</s>

<span class="u-assistive-text"> Custava </span>

<span class="u-assistive-text"> Agora </span>
```
