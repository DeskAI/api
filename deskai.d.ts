import { Observable } from "rxjs";

export interface Debugger {
  sendCommand: (command: string, args: any) => void;
}

export interface RPAOptions {
  [key: string]: any;
}

export class RPA {
  name: string;
  debugger: Debugger;

  constructor(name: string, url: string, options: RPAOptions);

  executeJavaScript(code: string, userGesture: boolean): void;

  insertText(text: string): void;

  handleMessage(method: string, params: any): void;

  destroy(): void;
}

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
export interface ILLMEngine {
  name: string;
  description: string;
  icon: string;
  configSchema: Record<string, any>;
  defaultConfig: Record<string, any>;
  onMount?(): void;
  onUnmount?(): void;

  loadConfig(config: any): any;

  setConfig(key: string, value: any): void;

  chat(content: message[], tools?: GPTTool[]): Promise<Observable<any>>;
}

export interface ILLM {
  addEngine(engine: ILLMEngine): void;
  use(name: string): void;
  addTool(tool: any): void;
}
export const LLM: ILLM

export interface Shortcuts {
  register(accelerator: string, callback: () => void): void;
}
