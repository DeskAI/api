export interface GPTTool {
  type: "function";
  function: {
    description?: string;
    name: string;
    parameters?: Record<string, any>;
  };
}

export interface ITextContent {
  type: string;
  text: string;
}
export interface IImageContent {
  type: string;
  image_url: {
    url: string;
    detail?: "auto" | "low" | "high";
  };
}
export type ContentPart = ITextContent | IImageContent;
export type message = {
  role: "system" | "user" | "assistant" | "tool";
} & (
  | {
      role: "user";
      content: string | ContentPart[];
    }
  | {
      role: "system";
      content: string;
    }
  | {
      role: "assistant";
      content: string;
      tool_calls?: {
        id: string;
        type: "function";
        function: {
          name: string;
          arguments: string;
        };
      }[];
    }
  | {
      role: "tool";
      content: string;
      tool_call_id: string;
    }
);

export interface IModel {
  label: string;
  value: string;
}

export interface ILLMEngineProvider {
  name: string;
  description: string;
  icon: string;
  configSchema: Record<string, any>;
  defaultConfig: Record<string, any>;
  currentModel: string;
  onMount?(): void;
  onUnmount?(): void;

  loadConfig(config: any): any;

  setConfig(key: string, value: any): void;

  getModels(): Promise<IModel>;

  chat(content: message[], tools?: Record<string, any>): Promise<Response>;
}

export interface IEmbeddingProvider {
  name: string;
  description: string;
  icon: string;
  configSchema: Record<string, any>;
  defaultConfig: Record<string, any>;
  currentModel: string;
  loadConfig(config: any): any;

  setConfig(key: string, value: any): void;

  getModels(): Promise<IModel>;

  embed(input: string, options?: Record<string, any>): Promise<Response>;
}

export interface ITool {
  name: string;
  description: string;
  icon: string;
  schema: Record<string, any>;
  configSchema?: Record<string, any>;
  defaultConfig?: Record<string, any>;
  func(parameters: any): Promise<any>;
  loadConfig?(config: any): any;
  setConfig?(key: string, value: any): void;
}

export class Locator {
  clic(options?: any): Promise<void>;

  outerHTML(options?: { timeout?: number }): Promise<string>;

  innerText(options?: { timeout?: number }): Promise<string>;

  innerHTML(options?: { timeout?: number }): Promise<string>;
}

export class Page {
  goto(
    url: string,
    options?: {
      referer?: string;
      timeout?: number;
      waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit";
    }
  ): Promise<null | Response>;

  evaluate<T = any>(
    pageFunction: string | ((...args: any[]) => T | Promise<T>),
    ...args: any[]
  ): Promise<T>;

  addInitScript(
    script: Function | string | { path?: string; content?: string },
    arg?: any
  ): Promise<void>;

  getByAltText(
    text: string | RegExp,
    options?: { exact?: boolean }
  ): Promise<Locator>;

  locator(
    selector: string,
    options?: {
      has?: Locator;
      hasText?: string | RegExp;
      hasNot?: Locator;
      hasNotText?: string | RegExp;
    }
  ): Locator;
}

export type CreateBrowserContextOptions = {
  headless: boolean;
}

export class BrowserContext {
  constructor(options?: CreateBrowserContextOptions);
  pages: Page[];
  newPage(): Page;
  close(): void;
}

export interface ILLM {
  addLLMProvider(engine: ILLMEngineProvider): void;
  use(name: string): void;
  addEmbeddingProvider(embeddingProvider: IEmbeddingProvider): void;
  addTool(tool: ITool): void;
}
export const LLM: ILLM;

export interface Shortcuts {
  register(accelerator: string, callback: () => void): void;
}
