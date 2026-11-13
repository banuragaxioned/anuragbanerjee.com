import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { pageMetadata } from "@/lib/metadata";
import {
  certifications,
  education,
  experience,
  languages,
  strengths,
} from "@/lib/resume";
import {
  breadcrumbNode,
  graph,
  personNode,
  profilePageNode,
} from "@/lib/schema";

const description =
  "Resume of Anurag Banerjee — Chief Operating Officer at Axioned.";

export const metadata: Metadata = pageMetadata({
  description,
  path: "/resume/",
  title: "Resume",
});

const heading =
  "text-sm font-medium tracking-wide text-muted-foreground uppercase";

export default function ResumePage() {
  return (
    <>
      <JsonLd
        schema={graph(
          personNode({
            alumniOf: education.map((entry) => ({
              "@type": "EducationalOrganization",
              name: entry.school,
            })),
            hasCredential: certifications.map((name) => ({
              "@type": "EducationalOccupationalCredential",
              name,
            })),
            knowsAbout: strengths,
            knowsLanguage: languages.map((language) =>
              language.replace(/\s*\(.*\)$/u, ""),
            ),
          }),
          profilePageNode({ description, name: "Resume", path: "/resume/" }),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Resume", path: "/resume/" },
          ]),
        )}
      />
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>
        <p className="mt-4">
          Chief Operating Officer at Axioned · Mumbai, India
        </p>
        <p className="mt-2 text-muted-foreground">
          Experienced project manager with a demonstrated history in the IT and
          services industry. Strong product and project management skills, with
          an MBA. For the longer story, find me on{" "}
          <a
            className="underline underline-offset-4"
            href="https://linkedin.com/in/imanuragbanerjee"
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
          .
        </p>
      </section>

      <section className="mt-12">
        <h2 className={heading}>Core strengths</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {strengths.map((strength) => (
            <Badge key={strength} variant="secondary">
              {strength}
            </Badge>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className={heading}>Experience</h2>
        <ul className="mt-6">
          {experience.map((entry, index) => (
            <li key={entry.company}>
              {index > 0 && <Separator className="my-8" />}
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">{entry.company}</h3>
                <span className="text-sm text-muted-foreground">
                  {entry.location}
                </span>
              </div>
              <ul className="mt-3 flex flex-col gap-4">
                {entry.roles.map((role) => (
                  <li key={role.title}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h4 className="font-medium">{role.title}</h4>
                      <span className="text-sm text-muted-foreground">
                        {role.period}
                      </span>
                    </div>
                    {role.points.length > 0 && (
                      <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                        {role.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className={heading}>Education</h2>
        <ul className="mt-6 flex flex-col gap-3">
          {education.map((entry) => (
            <li
              className="flex flex-wrap items-baseline justify-between gap-x-4"
              key={entry.school}
            >
              <h3 className="font-medium">{entry.school}</h3>
              <span className="text-sm text-muted-foreground">
                {entry.detail}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className={heading}>Certifications</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {certifications.map((cert) => (
            <Badge key={cert} variant="outline">
              {cert}
            </Badge>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className={heading}>Languages</h2>
        <p className="mt-4 text-sm text-muted-foreground">
          {languages.join(" · ")}
        </p>
      </section>
    </>
  );
}
