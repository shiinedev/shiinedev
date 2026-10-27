"use client"

export const Contact = () =>{

    return (
        <section id="contact" className="surface-card bg-muted px-6 py-10 sm:px-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Let&apos;s bring your idea to life
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
            I&apos;m always open to new opportunities, collaborations, and creative conversations. Feel
            free to reach out to discuss your project.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.currentTarget.reset();
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                maxLength={100}
                placeholder="Full Name*"
                className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                required
                type="email"
                maxLength={255}
                placeholder="Email Address*"
                className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <textarea
              rows={5}
              maxLength={1000}
              placeholder="Tell me about your project"
              className="w-full resize-y rounded-xl border border-border bg-card px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Send Message
            </button>
          </form>
        </section>
    )
}