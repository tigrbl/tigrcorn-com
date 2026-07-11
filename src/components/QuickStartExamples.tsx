import React from 'react';
import CopyableCode from './CopyableCode';

type ExampleId = 'tigrbl' | 'fastapi' | 'asgi3';

const examples: Array<{
  id: ExampleId;
  label: string;
  description: string;
  code: string;
  commands: string;
}> = [
  {
    id: 'tigrbl',
    label: 'Tigrbl',
    description: 'The recommended path for governed APIs, operations, schemas, hooks, and transport bindings.',
    code: `from tigrbl import TigrblApp

app = TigrblApp(title="Tigrbl on Tigrcorn")

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "server": "tigrcorn"}`,
    commands: `uv add tigrbl tigrcorn
uv run tigrcorn main:app --host 127.0.0.1 --port 8000`,
  },
  {
    id: 'fastapi',
    label: 'FastAPI',
    description: 'Run an existing FastAPI application directly on Tigrcorn without changing its ASGI interface.',
    code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "server": "tigrcorn"}`,
    commands: `uv add fastapi tigrcorn
uv run tigrcorn main:app --host 127.0.0.1 --port 8000`,
  },
  {
    id: 'asgi3',
    label: 'ASGI3 only',
    description: 'Use a framework-free ASGI3 callable when you want direct control over the protocol boundary.',
    code: `async def app(scope, receive, send):
    assert scope["type"] == "http"

    await send({
        "type": "http.response.start",
        "status": 200,
        "headers": [[b"content-type", b"application/json"]],
    })
    await send({
        "type": "http.response.body",
        "body": b'{"status":"ok","server":"tigrcorn"}',
    })`,
    commands: `uv add tigrcorn
uv run tigrcorn main:app --host 127.0.0.1 --port 8000`,
  },
];

export default function QuickStartExamples() {
  const [activeId, setActiveId] = React.useState<ExampleId>('tigrbl');
  const activeExample = examples.find((example) => example.id === activeId) ?? examples[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Tigrcorn application examples">
        {examples.map((example) => {
          const isActive = example.id === activeId;
          return (
            <button
              key={example.id}
              type="button"
              role="tab"
              id={`example-tab-${example.id}`}
              aria-selected={isActive}
              aria-controls={`example-panel-${example.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(example.id)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold transition ${
                isActive
                  ? 'border-orange-500/50 bg-orange-500/10 text-orange-300'
                  : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600 hover:text-white'
              }`}
            >
              {example.label}
              {example.id === 'tigrbl' ? (
                <span className="rounded-full bg-orange-500 px-1.5 py-0.5 text-[8px] uppercase tracking-wider text-white">
                  Priority
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`example-panel-${activeExample.id}`}
        aria-labelledby={`example-tab-${activeExample.id}`}
        className="space-y-4"
      >
        <p className="text-xs leading-relaxed text-slate-400">{activeExample.description}</p>
        <CopyableCode code={activeExample.code} language="python" title={`${activeExample.label} · main.py`} />
        <CopyableCode code={activeExample.commands} language="bash" title="Install and run with uv" />
      </div>
    </div>
  );
}
