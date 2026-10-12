
import React from 'react';
import { SpecCheckWatermark } from './SpecCheckLogo';
import {
  CodeIcon,
  RepoIcon,
  GraphIcon,
  TerminalIcon,
  GitPullRequestIcon,
} from './Icons';

const ICONS = [
  { Icon: CodeIcon, top: '19%', left: '8%', delay: '0s' },
  { Icon: RepoIcon, top: '46%', left: '5%', delay: '-4s' },
  { Icon: TerminalIcon, top: '76%', left: '10%', delay: '-8s' },
  { Icon: GraphIcon, top: '20%', right: '9%', delay: '-3s' },
  { Icon: GitPullRequestIcon, top: '75%', right: '8%', delay: '-6s' },
];

export default function BackgroundCanvas() {
  return (
    <div className="spec-background" aria-hidden="true">
      <div className="spec-background__grid" />

      <SpecCheckWatermark
        className="spec-background__watermark"
      />

      <div className="spec-background__icons">
        {ICONS.map(({ Icon, delay, ...position }, index) => (
          <div
            key={index}
            className="spec-background__icon"
            style={{
              ...position,
              animationDelay: delay,
            }}
          >
            <Icon
              className="h-6 w-6"
              strokeWidth={1.4}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
