import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';

const DEFAULT_LIBRECHAT_URL = 'http://localhost:3080';

function getLibreChatUrl(): string {
  // 1. Build-time / runtime environment variable (injected by webpack EnvironmentPlugin)
  if (typeof process !== 'undefined' && process.env.LIBRECHAT_URL) {
    return process.env.LIBRECHAT_URL;
  }

  // 2. Browser localStorage override (useful for local development)
  try {
    const stored = localStorage.getItem('librechat_url');
    if (stored) {
      return stored;
    }
  } catch {
    // localStorage may be unavailable in some sandboxed contexts
  }

  return DEFAULT_LIBRECHAT_URL;
}

export function O11yAssistantSidebar(): React.ReactElement {
  const styles = useStyles2(getStyles);
  const libreChatUrl = getLibreChatUrl();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>O11y Assistant</span>
      </div>
      <div className={styles.iframeWrapper}>
        <iframe
          title="O11y Assistant – LibreChat"
          src={libreChatUrl}
          className={styles.iframe}
          sandbox="allow-scripts allow-forms allow-popups allow-downloads"
          allow="clipboard-read; clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}

function getStyles(theme: GrafanaTheme2) {
  return {
    container: css({
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: theme.colors.background.primary,
      color: theme.colors.text.primary,
    }),
    header: css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(1, 2),
      borderBottom: `1px solid ${theme.colors.border.weak}`,
      backgroundColor: theme.colors.background.secondary,
      flexShrink: 0,
    }),
    title: css({
      fontSize: theme.typography.h6.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.colors.text.primary,
    }),
    iframeWrapper: css({
      flex: 1,
      overflow: 'hidden',
    }),
    iframe: css({
      width: '100%',
      height: '100%',
      border: 'none',
    }),
  };
}
