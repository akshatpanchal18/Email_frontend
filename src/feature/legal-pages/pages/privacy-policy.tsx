import { NavLink } from "react-router-dom";
import { privacyPolicyData } from "../data/privacy-policy.data";
import SEO from "../../../seo/seo";

const PrivacyPolicy = () => {
  const { eyebrow, title, description, lastUpdated, tableOfContents, sections, contact, relatedLinks } = privacyPolicyData;

  return (
    <>
      <SEO title={`${title} | MailFlex`} description={description} canonical="https://mailflex.vercel.app/terms-of-use" />
      <div className="bg-white">
        <section className="border-b border-gray-100">
          <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <p className="mb-3 text-sm font-medium text-blue-600">{eyebrow}</p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600">{description}</p>

            <p className="mt-4 text-sm text-gray-500">
              Last updated: <span className="font-medium text-gray-700">{lastUpdated}</span>
            </p>
          </div>
        </section>

        <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[180px_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">On this page</p>

                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <a key={item.id} href={`#${item.id}`} className="block text-sm text-gray-500 transition-colors hover:text-gray-900">
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <article className="min-w-0">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-12 scroll-mt-24">
                  <div className="mb-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-600">Section {section.number}</p>

                    <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">{section.title}</h2>
                  </div>

                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mb-4 text-sm leading-7 text-gray-600">
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="mb-5 space-y-2.5 pl-5 text-sm leading-7 text-gray-600">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="list-disc pl-1">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.subsections?.map((subsection) => (
                    <div key={subsection.title} className="mb-6">
                      <h3 className="mb-2 text-sm font-semibold text-gray-900">{subsection.title}</h3>

                      {subsection.paragraphs?.map((paragraph) => (
                        <p key={paragraph} className="mb-4 text-sm leading-7 text-gray-600">
                          {paragraph}
                        </p>
                      ))}

                      {subsection.bullets && (
                        <ul className="space-y-2.5 pl-5 text-sm leading-7 text-gray-600">
                          {subsection.bullets.map((bullet) => (
                            <li key={bullet} className="list-disc pl-1">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  {section.callout && (
                    <div className={`my-5 rounded-lg border p-4 ${section.callout.type === "warning" ? "border-amber-200 bg-amber-50 text-amber-900" : "border-blue-200 bg-blue-50 text-blue-900"}`}>
                      {section.callout.title && <p className="mb-1 text-sm font-semibold">{section.callout.title}</p>}

                      <p className="text-sm leading-6">{section.callout.content}</p>
                    </div>
                  )}

                  {section.table && (
                    <div className="my-5 overflow-x-auto rounded-lg border border-gray-200">
                      <table className="w-full min-w-125 text-left text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            {section.table.headers.map((header) => (
                              <th key={header} className="border-b border-gray-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>

                        <tbody>
                          {section.table.rows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b border-gray-100 last:border-0">
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-4 py-3 text-gray-600">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {section.id === "contact" && (
                    <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-5">
                      <dl className="space-y-4 text-sm">
                        {contact.map((item) => (
                          <div key={item.label} className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-4">
                            <dt className="font-medium text-gray-700">{item.label}</dt>

                            <dd className="wrap-break-word text-gray-600">{item.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                </section>
              ))}

              <div className="border-t border-gray-200 pt-8">
                {relatedLinks.map((link) => (
                  <NavLink key={link.to} to={link.to} className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </article>
          </div>
        </main>
      </div>
    </>
  );
};

export default PrivacyPolicy;
