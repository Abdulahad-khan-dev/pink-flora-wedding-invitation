# Pink Flora — Automatic Wedding Invitation

A mobile-first, single-page Next.js wedding invitation that automatically moves through scenes. No next/continue buttons are needed.

## Automatic sequence
1. Closed floral envelope (about 4.6 seconds), then the wax seal lifts and flap opens.
2. Floral invitation cover.
3. Couple names, wedding date and live countdown.
4. Wedding schedule / event timeline.
5. Venue illustration and Google Maps link.
6. RSVP form, which remains on screen for guests to respond.

The progress bar shows the automatic sequence. The final RSVP scene stays visible so a guest can enter their response. It is a front-end demo; to save responses or send them to the host, connect a backend or form service.

## Run locally
Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Customize
Edit `app/page.tsx`:
- Replace `Zohan` and `Rose` with the couple's names.
- Change `weddingDate` near the top (format: `YYYY-MM-DDTHH:mm:ss`).
- Change the date in the invitation text and the event timeline.
- Replace the venue name, address and Google Maps search URL.
- The RSVP form currently confirms on-screen only. Connect an endpoint/service to collect submissions.

## Timing
The sequence timings are configured in the `scenes` array at the top of `app/page.tsx`, in milliseconds. Adjust those durations to make each screen stay longer or shorter.
