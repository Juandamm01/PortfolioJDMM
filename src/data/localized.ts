import type { Lang } from '../i18n/ui';

export type Localized<T = string> = Record<Lang, T>;

export const pick = <T>(value: Localized<T>, lang: Lang): T => value[lang];
