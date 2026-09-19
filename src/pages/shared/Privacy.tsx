import { ScreenHeader } from '@/components/ScreenHeader';
import { privacyContent } from '@/content';

export function Privacy(): JSX.Element {
  return (
    <>
      <ScreenHeader
        title={privacyContent.title}
        lede={privacyContent.summary}
        status={privacyContent.status}
      />
      <div className="flex flex-col gap-4 px-4">
        {privacyContent.sections.map((section) => (
          <section key={section.heading} className="rounded-xl2 border border-line bg-ink-900 p-4">
            <h2 className="font-semibold">{section.heading}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{section.body}</p>
          </section>
        ))}
      </div>
    </>
  );
}
