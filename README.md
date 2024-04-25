Screw adobe, buy affinity Suite

### Tech

- turso (database)
- resend (email)
- cheerio (scraping)
- vercel (hope the hosting works in this case)
- upstash (cronjob)

https://github.com/emekaorji/web-scraping-with-nextjs-and-cheerio/blob/main/assets/js/webScraper.js

### Database structure

table "on sale" (boolean) (will be changed by API call) (api call via upstash?)

- One row that gets updated every time the API is called (what a use of sql database)

table "notifications" for people who want to receive an email for when affinity is on sale

- Should I have a column for "subscribed" as bool to check if they want to receive emails?
  check in resend

#### Stuff to check sale

```html
<s class="u-self-start u-text-boulder u-text-gamma u-strikethrough-sale u-lh-1">
  US$&nbsp;164,99
</s>

<span class="u-assistive-text"> Custava </span>

<span class="u-assistive-text"> Agora </span>
```

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
  - [x] try email map promise thing
  - [x] Need to see a logic for when someone subscribes, unsubscribes and subscribes again
  - [x] make it so a user can "resubscribe" to email notifications if he reenters the email in subscribeForm
  - [x] should the unsubscribe route be a page? Not for now because I'm lazy
- [x] check if schema has email as unique
- [x] tidy up route api code and handle sending emails only when there is a sale
- [x] Add footer
- [ ] Deploy to vercel
- [ ] Cleanup README
- [ ] Some more visual tinkering (both email and UI)
- [ ] Setup cronjob to check for sale (upstash?)
  - cron should be used for both checking for sale and sending email
  - define correct interval (everyday?)
- [ ] open graph stuff
- [ ] Add toast or something to show you subscribed (maybe not, lazy)

### Some references

The url we are checking for sale is (using [cheerio](https://github.com/cheeriojs/cheerio)):

- https://affinity.serif.com/en-us/affinity-pricing/
