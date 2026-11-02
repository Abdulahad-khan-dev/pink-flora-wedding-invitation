
"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, MapPin, Volume2, VolumeX } from "lucide-react";

const scenes = [
  { name: "The Envelope", duration: 4600 },
  { name: "The Invitation", duration: 6200 },
  { name: "The Celebration", duration: 5600 },
  { name: "The Timeline", duration: 6000 },
  { name: "The Venue", duration: 6200 },
  { name: "The RSVP", duration: 9000 },
];

const weddingDate = new Date("2027-02-14T17:00:00");

export default function Home() {
  const [scene, setScene] = useState(0);
  const [muted, setMuted] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState("joyfully accepts");
  const [submitted, setSubmitted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Start background music after the guest interacts
  const startMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      audio.volume = 0.6;
      audio.muted = false;

      await audio.play();
      setMuted(false);
    } catch (error) {
      console.error("Music playback failed:", error);
    }
  };

  // Mute and unmute music
  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        audio.muted = false;
        audio.volume = 0.6;
        await audio.play();
        setMuted(false);
        return;
      }

      audio.muted = !audio.muted;
      setMuted(audio.muted);
    } catch (error) {
      console.error("Music playback failed:", error);
    }
  };

  // Automatically move between scenes
  useEffect(() => {
    if (scene >= scenes.length - 1) return;

    const timer = window.setTimeout(() => {
      setScene((current) =>
        Math.min(current + 1, scenes.length - 1)
      );
    }, scenes[scene].duration);

    return () => window.clearTimeout(timer);
  }, [scene]);

  // Wedding countdown
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(
        0,
        weddingDate.getTime() - Date.now()
      );

      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();

    const id = window.setInterval(tick, 1000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <main className="experience">
      {/* Background music */}
    <audio
  ref={audioRef}
  src="/music/wedding-song.mp3"
  loop
  preload="auto"
  onError={() => {
    console.error(
      "Audio error:",
      audioRef.current?.error?.message
    );
  }}
/>
      <div className="paper-grain" />
      <div className="ambient-blob blob-one" />
      <div className="ambient-blob blob-two" />

      <div className="topline">
        <span className="brand">
          <i>✿</i> THE ART OF INVITING
        </span>

        <div className="progress-wrap">
          <span>
            {String(scene + 1).padStart(2, "0")}
          </span>

          <div className="progress-track">
            <i
              style={{
                width: `${((scene + 1) / scenes.length) * 100}%`,
              }}
            />
          </div>

          <span>
            {String(scenes.length).padStart(2, "0")}
          </span>
        </div>

        <button
          className="sound"
          onClick={toggleMusic}
          aria-label={muted ? "Play music" : "Mute music"}
          type="button"
        >
          {muted ? (
            <VolumeX size={15} />
          ) : (
            <Volume2 size={15} />
          )}
        </button>
      </div>

      <div className="scene-label">
        {scenes[scene].name}
      </div>

      <section
        className={`stage stage-${scene}`}
        aria-live="polite"
      >
        {/* SCENE 1 - ENVELOPE */}
        {scene === 0 && (
          <div className="envelope-scene">
            <div className="intro-copy">
              <p className="overline">
                A LITTLE SOMETHING, SEALED WITH LOVE
              </p>

              <h1>
                You're invited
                <br />
                <em>to our forever.</em>
              </h1>
            </div>

            <div className="envelope-wrap">
              <div className="envelope-shadow" />

              <div
                className="envelope"
                onClick={startMusic}
                role="button"
                tabIndex={0}
                aria-label="Open wedding invitation and play music"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    startMusic();
                  }
                }}
              >
                <div className="letter-peek">
                  <span className="letter-flower">❀</span>
                  <small>THE WEDDING OF</small>
                  <strong>
                    ZOHAN <i>&</i> ROSE
                  </strong>
                </div>

                <div className="envelope-back" />
                <div className="envelope-front" />
                <div className="envelope-flap" />

                <div className="wax-seal">
                  <span>R</span>
                  <i>✿</i>
                </div>

                <div className="envelope-corner corner-a">
                  ❧
                </div>

                <div className="envelope-corner corner-b">
                  ❧
                </div>
              </div>

              <div className="envelope-petals">
                {Array.from({ length: 9 }, (_, i) => (
                  <i
                    key={i}
                    style={{
                      left: `${(i * 31) % 100}%`,
                      animationDelay: `${i * -0.7}s`,
                    }}
                  >
                    ✿
                  </i>
                ))}
              </div>
            </div>

            <p className="auto-note">
              <span />
              OPENING YOUR INVITATION AUTOMATICALLY
              <span />
            </p>
          </div>
        )}

        {/* SCENE 2 - INVITATION COVER */}
        {scene === 1 && (
          <div className="invite-scene">
            <div className="floating-flower flower-a">
              ✿
            </div>

            <div className="floating-flower flower-b">
              ❀
            </div>

            <div className="cover-card">
              <div className="cover-arch">
                <div className="cover-bloom bloom-one">
                  ✿
                </div>

                <div className="cover-bloom bloom-two">
                  ❀
                </div>

                <div className="cover-inside">
                  <span className="mini-label">
                    TOGETHER WITH THEIR FAMILIES
                  </span>

                  <div className="cover-ornament">
                    ❦
                  </div>

                  <h2>
                    Zohan <i>&</i>
                    <br />
                    Rose
                  </h2>

                  <span className="cover-date">
                    14 · 02 · 2027
                  </span>

                  <div className="cover-swan">
                    ♧ <b>♡</b> ♧
                  </div>

                  <small>
                    THE BEGINNING OF FOREVER
                  </small>
                </div>
              </div>
            </div>

            <p className="scene-caption">
              A promise, wrapped in petals.
            </p>
          </div>
        )}

        {/* SCENE 3 - WEDDING DETAILS */}
        {scene === 2 && (
          <div className="details-scene">
            <div className="floral-corners">
              <span>❀</span>
              <span>❀</span>
              <span>❀</span>
              <span>❀</span>
            </div>

            <p className="script-kicker">
              With hearts full of love
            </p>

            <h2 className="large-names">
              Zohan <i>&</i> Rose
            </h2>

            <div className="fine-divider">
              <span />
              ❦
              <span />
            </div>

            <p className="body-copy">
              Together with our families,
              <br />
              we invite you to share in the joy
              <br />
              of our wedding celebration.
            </p>

            <div className="date-block">
              <span>SUNDAY</span>
              <strong>14</strong>
              <span>FEBRUARY · 2027</span>
            </div>

            <div className="countdown">
              {Object.entries(timeLeft).map(
                ([key, value]) => (
                  <div key={key}>
                    <strong>
                      {String(value).padStart(2, "0")}
                    </strong>
                    <small>{key.toUpperCase()}</small>
                  </div>
                )
              )}
            </div>

            <div className="little-rose">
              ✿
            </div>
          </div>
        )}

        {/* SCENE 4 - TIMELINE */}
        {scene === 3 && (
          <div className="timeline-scene">
            <p className="script-kicker">
              A day to remember
            </p>

            <h2 className="section-title">
              The Celebration <i>begins</i>
            </h2>

            <p className="section-subtitle">
              A few beautiful moments, shared with you.
            </p>

            <div className="timeline">
              <div className="timeline-item">
                <span className="time">05:00 PM</span>
                <i className="timeline-dot">✿</i>
                <div>
                  <strong>Guest Arrival</strong>
                  <small>
                    Welcome drinks & warm embraces
                  </small>
                </div>
              </div>

              <div className="timeline-item">
                <span className="time">06:00 PM</span>
                <i className="timeline-dot">♡</i>
                <div>
                  <strong>Nikah Ceremony</strong>
                  <small>
                    A sacred promise, witnessed by love
                  </small>
                </div>
              </div>

              <div className="timeline-item">
                <span className="time">07:00 PM</span>
                <i className="timeline-dot">✧</i>
                <div>
                  <strong>Wedding Dinner</strong>
                  <small>
                    An evening of food, joy & laughter
                  </small>
                </div>
              </div>

              <div className="timeline-item">
                <span className="time">08:30 PM</span>
                <i className="timeline-dot">❀</i>
                <div>
                  <strong>Celebration</strong>
                  <small>
                    Photographs and forever memories
                  </small>
                </div>
              </div>
            </div>

            <div className="timeline-flower">
              ❀
            </div>
          </div>
        )}

        {/* SCENE 5 - VENUE */}
        {scene === 4 && (
          <div className="venue-scene">
            <p className="script-kicker">
              Find your way to us
            </p>

            <h2 className="section-title">
              The <i>Venue</i>
            </h2>

            <div className="venue-illustration">
              <div className="venue-sky">
                <span>☼</span>
              </div>

              <div className="venue-building">
                <div className="venue-dome" />
                <div className="venue-wing left" />
                <div className="venue-wing right" />

                <div className="venue-center">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>

                <div className="venue-steps" />
              </div>

              <div className="venue-garden">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>

            <div className="venue-info">
              <MapPin size={18} />

              <h3>Rosewood Garden Marquee</h3>

              <p>
                Canal View Road, Lahore, Pakistan
              </p>

              <a
                href="https://maps.google.com/?q=Rosewood+Garden+Marquee+Lahore"
                target="_blank"
                rel="noreferrer"
              >
                VIEW LOCATION ↗
              </a>
            </div>
          </div>
        )}

        {/* SCENE 6 - RSVP */}
        {scene === 5 && (
          <div className="rsvp-scene">
            <div className="rsvp-flower">
              ❀
            </div>

            <p className="script-kicker">
              Your presence is our present
            </p>

            <h2 className="section-title">
              Kindly <i>reply</i>
            </h2>

            <p className="section-subtitle">
              We would be delighted to celebrate this day
              with you.
            </p>

            {submitted ? (
              <div className="thanks-card">
                <span>♡</span>

                <h3>
                  Thank you, {guestName || "dear friend"}!
                </h3>

                <p>
                  Your response has been received with love.
                </p>
              </div>
            ) : (
              <form
                className="rsvp-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <label htmlFor="guest">
                  YOUR NAME
                </label>

                <input
                  id="guest"
                  value={guestName}
                  onChange={(e) =>
                    setGuestName(e.target.value)
                  }
                  placeholder="Write your name"
                  required
                />

                <label htmlFor="attendance">
                  YOUR RESPONSE
                </label>

                <select
                  id="attendance"
                  value={attendance}
                  onChange={(e) =>
                    setAttendance(e.target.value)
                  }
                >
                  <option value="joyfully accepts">
                    Joyfully accepts
                  </option>

                  <option value="regretfully declines">
                    Regretfully declines
                  </option>
                </select>

                <button type="submit">
                  SEND MY RESPONSE
                  <Heart size={14} />
                </button>
              </form>
            )}

            <div className="rsvp-signoff">
              With love, Zohan & Rose
            </div>
          </div>
        )}
      </section>

      <div className="bottom-progress">
        <div className="bottom-track">
          <i
            style={{
              width: `${((scene + 1) / scenes.length) * 100}%`,
            }}
          />
        </div>

        <span>
          {scene === scenes.length - 1
            ? "THANK YOU FOR BEING PART OF OUR STORY"
            : "A MOMENT UNFOLDS..."}
        </span>
      </div>
    </main>
  );
}
