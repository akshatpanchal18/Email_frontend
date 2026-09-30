import { NavLink } from "react-router-dom";
import { LuExternalLink } from "react-icons/lu";
import { termsOfUseData } from "../data/terms-of-use.data";
import SEO from "../../../seo/seo";

const TermsOfUse = () => {
  const { eyebrow, title, description, lastUpdated, tableOfContents, sections, contact, relatedLinks } = termsOfUseData;

  return (
    <>
      <SEO title={`${title} | MailFlex`} description={description} canonical="https://mailflex.vercel.app/terms-of-use" />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="border-b border-gray-200 bg-gray-50">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold text-blue-600">{eyebrow}</p>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>

              <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">{description}</p>

              <p className="mt-5 text-sm text-gray-400">Last updated: {lastUpdated}</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
            {/* Table of contents */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">On this page</p>

                <nav className="space-y-1 border-l border-gray-200">
                  {tableOfContents.map((item) => (
                    <a key={item.id} href={`#${item.id}`} className="block border-l-2 border-transparent py-1.5 pl-4 text-sm text-gray-500 transition-colors hover:border-blue-600 hover:text-gray-900">
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Document */}
            <article className="min-w-0 max-w-3xl">
              {/* Mobile TOC */}
              <details className="mb-10 rounded-xl border border-gray-200 bg-gray-50 lg:hidden">
                <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-gray-900">Table of contents</summary>

                <nav className="border-t border-gray-200 px-4 py-3">
                  <div className="space-y-2">
                    {tableOfContents.map((item) => (
                      <a key={item.id} href={`#${item.id}`} className="block text-sm text-gray-500 hover:text-gray-900">
                        {item.label}
                      </a>
                    ))}
                  </div>
                </nav>
              </details>

              {sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-12 scroll-mt-24">
                  {/* Section heading */}
                  <div className="mb-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex size-6 items-center justify-center rounded-md bg-blue-50 text-xs font-semibold text-blue-600">{section.number}</span>

                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Section</span>
                    </div>

                    <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">{section.title}</h2>
                  </div>

                  {/* Paragraphs */}
                  {section.paragraphs?.length ? (
                    <div className="space-y-4">
                      {section.paragraphs.map((paragraph, index) => (
                        <p key={`${section.id}-paragraph-${index}`} className="text-sm leading-7 text-gray-600 sm:text-[15px]">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {/* Bullet list */}
                  {section.bullets?.length ? (
                    <ul className="mt-5 space-y-3 pl-5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="list-disc pl-1 text-sm leading-7 text-gray-600 sm:text-[15px]">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {/* Subsections */}
                  {section.subsections?.length ? (
                    <div className="mt-7 space-y-7">
                      {section.subsections.map((subsection) => (
                        <div key={subsection.title}>
                          <h3 className="mb-2 text-sm font-semibold text-gray-900">{subsection.title}</h3>

                          {subsection.paragraphs?.length ? (
                            <div className="space-y-3">
                              {subsection.paragraphs.map((paragraph, index) => (
                                <p key={`${subsection.title}-${index}`} className="text-sm leading-7 text-gray-600 sm:text-[15px]">
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          ) : null}

                          {subsection.bullets?.length ? (
                            <ul className="mt-3 space-y-2 pl-5">
                              {subsection.bullets.map((bullet) => (
                                <li key={bullet} className="list-disc pl-1 text-sm leading-7 text-gray-600">
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {/* Callout */}
                  {section.callout ? (
                    <div className={`mt-6 rounded-xl border p-4 ${section.callout.type === "warning" ? "border-amber-200 bg-amber-50" : "border-blue-200 bg-blue-50"}`}>
                      {section.callout.title ? (
                        <p className={`mb-1 text-sm font-semibold ${section.callout.type === "warning" ? "text-amber-900" : "text-blue-900"}`}>{section.callout.title}</p>
                      ) : null}

                      <p className={`text-sm leading-6 ${section.callout.type === "warning" ? "text-amber-800" : "text-blue-800"}`}>{section.callout.content}</p>
                    </div>
                  ) : null}
                </section>
              ))}

              {/* Contact */}
              <section id="contact" className="scroll-mt-24 border-t border-gray-200 pt-10">
                <h2 className="text-xl font-semibold text-gray-900">Contact</h2>

                <p className="mt-3 text-sm leading-7 text-gray-600">If you have questions about these Terms of Use or MailFlex, you can contact us using the information below.</p>

                <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
                  {contact.map((item, index) => (
                    <div key={item.label} className={`grid gap-1 px-4 py-4 sm:grid-cols-[140px_1fr] sm:gap-4 ${index !== contact.length - 1 ? "border-b border-gray-200" : ""}`}>
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>

                      <span className="break-all text-sm text-gray-600">{item.value}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Related legal pages */}
              {relatedLinks.length > 0 ? (
                <div className="mt-10 flex flex-wrap gap-3 border-t border-gray-200 pt-8">
                  {relatedLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {link.label}
                      <LuExternalLink size={14} />
                    </NavLink>
                  ))}
                </div>
              ) : null}

              {/* Bottom */}
              <div className="mt-12 border-t border-gray-200 pt-8">
                <p className="text-center text-xs leading-5 text-gray-400">These Terms of Use apply to your use of MailFlex.</p>
              </div>
            </article>
          </div>
        </main>
      </div>
    </>
  );
};

export default TermsOfUse;
