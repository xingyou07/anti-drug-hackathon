import { ToolScreen } from '@/components/ToolScreen';
import { legalExplainerContent } from '@/content';

export function LegalExplainer(): JSX.Element {
  return (
    <ToolScreen backTo="/recovery" title={legalExplainerContent.title} status={legalExplainerContent.status}>
      <div className="flex flex-col gap-4 px-4">
        {legalExplainerContent.body.map((paragraph) => (
          <p key={paragraph} className="leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
        <div className="rounded-xl2 border border-crisis-600/40 bg-crisis-600/10 p-4">
          <p className="text-sm leading-relaxed text-fg">{legalExplainerContent.crisisNote}</p>
        </div>
      </div>
    </ToolScreen>
  );
}
