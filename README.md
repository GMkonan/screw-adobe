Screw adobe, buy affinity

### Tech

- turso?
- resend (email)
- cheerio
- vercel (hope the hosting works in this case)
- cronjob (upstash?)

https://github.com/emekaorji/web-scraping-with-nextjs-and-cheerio/blob/main/assets/js/webScraper.js

### Database structure

table "on sale" (boolean) (will be changed by API call) (api call via upstash?)

table "notifications" for people who want to receive an email for when affinity is on sale

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
- [ ] Setup Database (turso???)
- [ ] Add database calls to api and frontend
- [ ] Setup cronjob to check for sale (upstash?)
- [ ] Setup email notifications
- [ ] Create email template Interface
- [ ] Deploy to vercel
