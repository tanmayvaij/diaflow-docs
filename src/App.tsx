import { useState, useEffect, type ReactNode, type ElementType } from "react";
import {
  Code2,
  Zap,
  Brain,
  Package,
  Link,
  Star,
  Github,
  Copy,
  Check,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Terminal,
  BookOpen,
  Database,
  ExternalLink,
  FileText,
  Folder,
  HardDrive,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const DiaFlowDocs = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState("");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "features", "quickstart", "tools", "memory"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const CodeBlock = ({
    children,
    language = "typescript",
    id,
  }: {
    children: string;
    language: string;
    id: string;
  }) => (
    <div className="relative bg-slate-900 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-800 text-slate-300 text-sm">
        <span>{language}</span>
        <button
          onClick={() => copyToClipboard(children, id)}
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          {copiedCode === id ? <Check size={16} /> : <Copy size={16} />}
          {copiedCode === id ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-slate-100">{children}</code>
      </pre>
    </div>
  );

  const FeatureCard = ({
    icon: Icon,
    title,
    description,
    gradient,
  }: {
    icon: ElementType;
    title: string;
    description: string;
    gradient: string;
  }) => (
    <div className="group relative bg-white border border-slate-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div
        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}
      >
        <Icon className="text-white" size={24} />
      </div>
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );

  const NavItem = ({
    children,
    isActive,
    onClick,
  }: {
    children: ReactNode;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
        isActive
          ? "bg-indigo-100 text-indigo-700"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-slate-200 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="text-white" size={18} />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  DiaFlow
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavItem
                isActive={activeSection === "home"}
                onClick={() => scrollToSection("home")}
              >
                Home
              </NavItem>
              <NavItem
                isActive={activeSection === "features"}
                onClick={() => scrollToSection("features")}
              >
                Features
              </NavItem>
              <NavItem
                isActive={activeSection === "quickstart"}
                onClick={() => scrollToSection("quickstart")}
              >
                Quick Start
              </NavItem>
              <NavItem
                isActive={activeSection === "tools"}
                onClick={() => scrollToSection("tools")}
              >
                Tools
              </NavItem>
              <NavItem
                isActive={activeSection === "memory"}
                onClick={() => scrollToSection("memory")}
              >
                Memory
              </NavItem>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a
                href="https://github.com/tanmayvaij/diaflow"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Github size={18} />
                <span>GitHub</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-lg">
              <div className="px-4 py-3 space-y-2">
                <NavItem
                  isActive={activeSection === "home"}
                  onClick={() => scrollToSection("home")}
                >
                  Home
                </NavItem>
                <NavItem
                  isActive={activeSection === "features"}
                  onClick={() => scrollToSection("features")}
                >
                  Features
                </NavItem>
                <NavItem
                  isActive={activeSection === "quickstart"}
                  onClick={() => scrollToSection("quickstart")}
                >
                  Quick Start
                </NavItem>
                <NavItem
                  isActive={activeSection === "tools"}
                  onClick={() => scrollToSection("tools")}
                >
                  Tools
                </NavItem>
                <NavItem
                  isActive={activeSection === "memory"}
                  onClick={() => scrollToSection("memory")}
                >
                  Memory
                </NavItem>
                <div className="pt-2 border-t border-slate-200">
                  <a
                    href="https://github.com/tanmayvaij/diaflow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 bg-slate-900 text-white rounded-lg"
                  >
                    <Github size={18} />
                    <span>GitHub</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                <span>Lightweight AI Agent Framework for Gemini</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6">
                Build AI Agents with
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  DiaFlow
                </span>
              </h1>

              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                A lightweight AI agent framework built exclusively for Google
                GenAI. Create tool-using agents with memory and structured JSON
                outputs powered by Zod. Unlike other frameworks, DiaFlow is
                focused entirely on Gemini models — keeping the API simple and
                beginner-friendly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => scrollToSection("quickstart")}
                  className="flex items-center space-x-2 bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  <span className="font-medium">Get Started</span>
                  <ArrowRight size={18} />
                </button>

                <a
                  href="https://github.com/tanmayvaij/diaflow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 border border-slate-300 text-slate-700 px-8 py-4 rounded-lg hover:bg-slate-50 transition-all duration-200"
                >
                  <Github size={18} />
                  <span className="font-medium">View on GitHub</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Quick Example */}
            <div className="mt-20 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Quick Example
                </h2>
                <p className="text-slate-600">
                  Get started with DiaFlow in just a few lines of code
                </p>
              </div>

              <CodeBlock language="typescript" id="hero-example">
                {`import DiaFlowAgent, { InMemory } from "diaflow";
import * as z from "zod";
import { tools } from "./tools";

const agent = new DiaFlowAgent({
  apiKey: process.env.GENAI_API_KEY!,
  tools,
  memory: new InMemory(),
  model: "gemini-2.0-flash", // default
  responseJsonSchema: z.object({
    success: z.boolean(),
    message: z.string(),
  }),
  verbose: true, // Enable logging
});

const result = await agent.run("Create a directory called testdir");
console.log(result);`}
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Everything you need to build sophisticated AI agents with Gemini
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={Code2}
                title="Tool Calling"
                description="Define function declarations and handlers that the model can call. Includes built-in filesystem tools for common operations."
                gradient="from-blue-500 to-blue-600"
              />

              <FeatureCard
                icon={Brain}
                title="Memory Support"
                description="Choose between in-memory or persistent MongoDB-backed memory. Maintain context across sessions with ease."
                gradient="from-purple-500 to-purple-600"
              />

              <FeatureCard
                icon={Package}
                title="Structured Outputs"
                description="Enforce response schemas using Zod validation to ensure consistent, type-safe JSON outputs from your agents."
                gradient="from-green-500 to-green-600"
              />

              <FeatureCard
                icon={Link}
                title="Composable Agents"
                description="Chain multiple agents to form workflows. Create complex orchestrations with sequential or parallel execution."
                gradient="from-indigo-500 to-indigo-600"
              />

              <FeatureCard
                icon={Zap}
                title="TypeScript-first"
                description="Full TypeScript support with comprehensive typings for agents, tools, and schemas. Great developer experience."
                gradient="from-orange-500 to-orange-600"
              />

              <FeatureCard
                icon={Terminal}
                title="Lightweight"
                description="Only depends on @google/genai, zod, and mongodb. No bloated frameworks - just the essentials."
                gradient="from-red-500 to-red-600"
              />
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section
          id="quickstart"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-indigo-50"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Quick Start Guide
              </h2>
              <p className="text-xl text-slate-600">
                Get up and running with DiaFlow in minutes
              </p>
            </div>

            <div className="space-y-12">
              {/* Installation */}
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                  <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </span>
                  Installation
                </h3>

                <p className="text-slate-600 mb-4">
                  Install DiaFlow using npm or yarn:
                </p>

                <CodeBlock language="bash" id="install">
                  {`npm install diaflow`}
                </CodeBlock>

                <p className="text-slate-600 mt-2">or with yarn:</p>

                <CodeBlock language="bash" id="install-yarn">
                  {`yarn add diaflow`}
                </CodeBlock>
              </div>

              {/* Basic Usage */}
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                  <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </span>
                  Basic Usage
                </h3>

                <p className="text-slate-600 mb-4">
                  Create your first agent with built-in tools:
                </p>

                <CodeBlock language="typescript" id="basic-usage">
                  {`import DiaFlowAgent, { InMemory, tools } from "diaflow";

const agent = new DiaFlowAgent({
  apiKey: process.env.GENAI_API_KEY!,
  tools: [
    tools.fileSystemTools.readFileTool(),
    tools.fileSystemTools.writeFileTool(),
    tools.fileSystemTools.makeDirectoryTool(),
    tools.fileSystemTools.currentWorkingDirectoryTool(),
  ],
  memory: new InMemory(),
  verbose: true, // See what's happening under the hood
});

const result = await agent.run("Read the package.json file");
console.log(result);`}
                </CodeBlock>
              </div>

              {/* Defining Custom Tools */}
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                  <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  Defining Custom Tools
                </h3>

                <p className="text-slate-600 mb-4">
                  Create your own tools with proper typing:
                </p>

                <CodeBlock language="typescript" id="custom-tools">
                  {`import { DiaFlowTool, ToolResponse } from "diaflow";
import { Type } from "@google/genai";

export const makeDirectoryTool = (): DiaFlowTool => ({
  declaration: {
    name: "makeDirectory",
    description: "Creates a directory on a given path",
    parameters: {
      type: Type.OBJECT,
      properties: {
        dirPath: {
          type: Type.STRING,
          description: "Path where the directory has to be created",
        },
      },
      required: ["dirPath"],
    },
  },
  handler: ({ dirPath }): ToolResponse => {
    try {
      mkdirSync(dirPath, { recursive: true });
      return {
        success: true,
        data: \`Directory created at \${dirPath}\`,
        error: undefined,
      };
    } catch (error) {
      return {
        success: false,
        data: undefined,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});`}
                </CodeBlock>
              </div>

              {/* Structured Output */}
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                  <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    4
                  </span>
                  Structured Output with Zod
                </h3>

                <p className="text-slate-600 mb-4">
                  Get type-safe, validated JSON responses:
                </p>

                <CodeBlock language="typescript" id="structured-output">
                  {`import DiaFlowAgent, { InMemory } from "diaflow";
import * as z from "zod";

const agent = new DiaFlowAgent({
  apiKey: process.env.GENAI_API_KEY!,
  memory: new InMemory(),
  responseJsonSchema: z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
      filesCreated: z.array(z.string()),
      errors: z.array(z.string()).optional(),
    }),
  }),
});

// Response will be typed and validated automatically
const result = await agent.run("Analyze the project structure");`}
                </CodeBlock>
              </div>

              <Alert>
                <BookOpen className="h-4 w-4" />
                <AlertDescription>
                  <strong>Pro Tip:</strong> Enable verbose mode with{" "}
                  <code className="bg-slate-100 px-1 rounded">
                    verbose: true
                  </code>{" "}
                  to see tool calls, responses, and the full agent execution
                  flow in your console.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>

        {/* Built-in Tools Section */}
        <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Built-in File System Tools
              </h2>
              <p className="text-xl text-slate-600">
                DiaFlow ships with production-ready tools for common operations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <FileText className="text-blue-600" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    readFileTool
                  </h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Reads file contents from a given path with specified encoding.
                </p>
                <CodeBlock language="typescript" id="read-file-tool">
                  {`import { tools } from "diaflow";

const agent = new DiaFlowAgent({
  tools: [tools.fileSystemTools.readFileTool()],
  // ... other config
});`}
                </CodeBlock>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <FileText className="text-green-600" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    writeFileTool
                  </h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Writes content to a file at the specified path with encoding.
                </p>
                <CodeBlock language="typescript" id="write-file-tool">
                  {`import { tools } from "diaflow";

const agent = new DiaFlowAgent({
  tools: [tools.fileSystemTools.writeFileTool()],
  // ... other config
});`}
                </CodeBlock>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <Folder className="text-purple-600" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    makeDirectoryTool
                  </h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Creates directories at the specified path with recursive
                  support.
                </p>
                <CodeBlock language="typescript" id="mkdir-tool">
                  {`import { tools } from "diaflow";

const agent = new DiaFlowAgent({
  tools: [tools.fileSystemTools.makeDirectoryTool()],
  // ... other config
});`}
                </CodeBlock>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <HardDrive className="text-orange-600" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    currentWorkingDirectoryTool
                  </h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Returns the absolute path of the current working directory.
                </p>
                <CodeBlock language="typescript" id="cwd-tool">
                  {`import { tools } from "diaflow";

const agent = new DiaFlowAgent({
  tools: [tools.fileSystemTools.currentWorkingDirectoryTool()],
  // ... other config
});`}
                </CodeBlock>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Using All Tools Together
              </h3>
              <p className="text-slate-600 mb-6">
                Import and use all built-in tools at once for maximum
                capability:
              </p>
              <CodeBlock language="typescript" id="all-tools">
                {`import DiaFlowAgent, { InMemory, tools } from "diaflow";

const agent = new DiaFlowAgent({
  apiKey: process.env.GENAI_API_KEY!,
  tools: [
    tools.fileSystemTools.readFileTool(),
    tools.fileSystemTools.writeFileTool(),
    tools.fileSystemTools.makeDirectoryTool(),
    tools.fileSystemTools.currentWorkingDirectoryTool(),
  ],
  memory: new InMemory(),
  verbose: true,
});

// Now your agent can read, write, create directories, and navigate!
await agent.run("Create a logs directory and write today's date to log.txt");`}
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* Memory Section */}
        <section
          id="memory"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-indigo-50"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Memory Management
              </h2>
              <p className="text-xl text-slate-600">
                Choose between in-memory or persistent storage for conversation
                context
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* In-Memory */}
              <div className="bg-white border border-slate-200 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      InMemory
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Fast, ephemeral storage
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 mb-6">
                  Perfect for single-session agents or when you don't need to
                  persist conversation history.
                </p>

                <CodeBlock language="typescript" id="in-memory">
                  {`import DiaFlowAgent, { InMemory } from "diaflow";

const agent = new DiaFlowAgent({
  apiKey: process.env.GENAI_API_KEY!,
  memory: new InMemory(),
});

// Memory is reset when the process ends
await agent.run("Hello!");
await agent.run("What did I just say?"); // Agent remembers!`}
                </CodeBlock>

                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold text-slate-800">Key Methods:</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      <span>
                        <code className="bg-slate-100 px-1 rounded">
                          addUserText(text)
                        </code>{" "}
                        - Add user message
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      <span>
                        <code className="bg-slate-100 px-1 rounded">
                          addToolCall(name, args)
                        </code>{" "}
                        - Record tool invocation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      <span>
                        <code className="bg-slate-100 px-1 rounded">
                          addToolResponse(name, result)
                        </code>{" "}
                        - Store tool output
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      <span>
                        <code className="bg-slate-100 px-1 rounded">
                          getContent()
                        </code>{" "}
                        - Retrieve full history
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      <span>
                        <code className="bg-slate-100 px-1 rounded">
                          reset()
                        </code>{" "}
                        - Clear all memory
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Persistent Memory */}
              <div className="bg-white border border-slate-200 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-4">
                    <Database className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      PersistentMemory
                    </h3>
                    <p className="text-slate-600 text-sm">
                      MongoDB-backed storage
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 mb-6">
                  Ideal for multi-session agents where conversation history
                  needs to persist across restarts.
                </p>

                <CodeBlock language="typescript" id="persistent-memory">
                  {`import DiaFlowAgent, { PersistentMemory } from "diaflow";

const agent = new DiaFlowAgent({
  apiKey: process.env.GENAI_API_KEY!,
  memory: new PersistentMemory(
    "mongodb://localhost:27017"
  ),
});

// Memory persists in MongoDB collection
await agent.run("Remember this important fact!");
// Restart your app...
await agent.run("What did I tell you earlier?"); // Still remembers!`}
                </CodeBlock>

                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold text-slate-800">Features:</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>
                        Stores in{" "}
                        <code className="bg-slate-100 px-1 rounded">
                          diaflow.memory
                        </code>{" "}
                        collection
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Automatic connection management</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Same BaseMemory interface as InMemory</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Async operations for all methods</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Perfect for production deployments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* BaseMemory Interface */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">BaseMemory Interface</h3>
              <p className="text-slate-300 mb-6">
                Both memory implementations follow the same interface, making it
                easy to switch between them:
              </p>
              <CodeBlock language="typescript" id="base-memory">
                {`export interface BaseMemory {
  addUserText(text: string): Promise<void> | void;
  addToolCall(name: string, args: Record<string, any>): Promise<void> | void;
  addToolResponse(name: string, result: ToolResponse): Promise<void> | void;
  addModelText(text: string): Promise<void> | void;
  getContent(): Promise<Content[]> | Content[];
  reset(): Promise<void> | void;
}

// Switch between memory types without changing your code:
const memory = process.env.USE_MONGO 
  ? new PersistentMemory(process.env.MONGO_URI!)
  : new InMemory();`}
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* Advanced Examples */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Advanced Examples
              </h2>
              <p className="text-xl text-slate-600">
                Real-world patterns for building production agents
              </p>
            </div>

            <div className="space-y-8">
              {/* Graph Execution */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                  <Link className="mr-3 text-green-600" size={28} />
                  Graph-Like Execution
                </h3>
                <p className="text-slate-600 mb-6">
                  Chain multiple agents together to create complex workflows
                  with sequential or parallel execution:
                </p>
                <CodeBlock language="typescript" id="graph-execution">
                  {`import DiaFlowAgent, { InMemory, tools } from "diaflow";

// Agent 1: File analyzer
const analyzerAgent = new DiaFlowAgent({
  apiKey: process.env.GENAI_API_KEY!,
  tools: [tools.fileSystemTools.readFileTool()],
  memory: new InMemory(),
});

// Agent 2: Report generator
const reportAgent = new DiaFlowAgent({
  apiKey: process.env.GENAI_API_KEY!,
  tools: [tools.fileSystemTools.writeFileTool()],
  memory: new InMemory(),
});

// Sequential workflow
const analysis = await analyzerAgent.run("Analyze package.json");
const report = await reportAgent.run(
  \`Generate a report based on this: \${analysis}\`
);

console.log("Workflow complete:", report);`}
                </CodeBlock>
              </div>

              {/* Verbose Logging */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                  <Terminal className="mr-3 text-blue-600" size={28} />
                  Debugging with Verbose Mode
                </h3>
                <p className="text-slate-600 mb-6">
                  Enable verbose logging to see exactly what your agent is
                  doing:
                </p>
                <CodeBlock language="typescript" id="verbose-mode">
                  {`const agent = new DiaFlowAgent({
  apiKey: process.env.GENAI_API_KEY!,
  tools: [tools.fileSystemTools.currentWorkingDirectoryTool()],
  verbose: true, // 👈 Enable detailed logging
});

await agent.run("What is the current working directory?");

// Console output:
// [DiaFlowAgent] ▶️  User input: What is the current working directory?
// [DiaFlowAgent] 🛠️  Model requested tool: currentWorkingDirectory with args: {}
// [DiaFlowAgent] ✔️  Tool response: Current working directory: /home/user/project
// [DiaFlowAgent] ✴️  Final text response: The current working directory is...`}
                </CodeBlock>
              </div>

              {/* Complete Example */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                  <Sparkles className="mr-3 text-purple-600" size={28} />
                  Complete Production Example
                </h3>
                <p className="text-slate-600 mb-6">
                  A full example with error handling, structured output, and all
                  features:
                </p>
                <CodeBlock language="typescript" id="complete-example">
                  {`import DiaFlowAgent, { InMemory, tools, DiaFlowTool } from "diaflow";
import * as z from "zod";

// Define response schema
const responseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    filesProcessed: z.array(z.string()),
    totalSize: z.number().optional(),
  }).optional(),
  errors: z.array(z.string()).optional(),
});

// Create agent with all built-in tools
const agent = new DiaFlowAgent({
  apiKey: process.env.GENAI_API_KEY!,
  model: "gemini-2.0-flash",
  tools: [
    tools.fileSystemTools.readFileTool(),
    tools.fileSystemTools.writeFileTool(),
    tools.fileSystemTools.makeDirectoryTool(),
    tools.fileSystemTools.currentWorkingDirectoryTool(),
  ],
  memory: new InMemory(),
  responseJsonSchema: responseSchema,
  verbose: true,
});

// Run the agent
try {
  const result = await agent.run(
    "Create a 'reports' directory and write a summary of package.json to reports/summary.txt"
  );
  
  console.log("Success:", result.success);
  console.log("Message:", result.message);
  console.log("Files processed:", result.data?.filesProcessed);
} catch (error) {
  console.error("Agent failed:", error);
}

// Type-safe result thanks to Zod!
// TypeScript knows the exact shape of 'result'`}
                </CodeBlock>
              </div>
            </div>
          </div>
        </section>

        {/* Model Support */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-indigo-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Supported Gemini Models
              </h2>
              <p className="text-xl text-slate-600">
                DiaFlow works with all Gemini model variants
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">
                    Gemini 2.5 Series
                  </h4>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      <code className="text-sm">gemini-2.5-pro</code>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      <code className="text-sm">gemini-2.5-flash</code>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      <code className="text-sm">gemini-2.5-flash-lite</code>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      <code className="text-sm">gemini-2.5-flash-image</code>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">
                    Gemini 2.0 Series
                  </h4>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <code className="text-sm">gemini-2.0-flash</code>{" "}
                      <span className="text-xs ml-2 text-green-600">
                        (default)
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <code className="text-sm">gemini-2.0-flash-lite</code>
                    </li>
                  </ul>
                </div>
              </div>

              <CodeBlock language="typescript" id="model-selection">
                {`// Specify model in constructor
const agent = new DiaFlowAgent({
  apiKey: process.env.GENAI_API_KEY!,
  model: "gemini-2.5-pro", // Use any supported model
  // ... other options
});`}
              </CodeBlock>
            </div>

            <Alert className="mt-8">
              <Star className="h-4 w-4" />
              <AlertDescription>
                <strong>Why Gemini only?</strong> By focusing solely on Gemini,
                DiaFlow keeps the API simple and ensures the best integration.
                Plus, Gemini is currently the only top-tier LLM with a generous
                free tier, making it perfect for beginners!
              </AlertDescription>
            </Alert>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="text-white" size={18} />
                </div>
                <span className="text-xl font-bold">DiaFlow</span>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                A lightweight AI agent framework built exclusively for Google
                GenAI. Create tool-using agents with memory and structured
                outputs.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/tanmayvaij/diaflow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Documentation</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <button
                    onClick={() => scrollToSection("quickstart")}
                    className="hover:text-white transition-colors"
                  >
                    Quick Start
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("tools")}
                    className="hover:text-white transition-colors"
                  >
                    Built-in Tools
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("memory")}
                    className="hover:text-white transition-colors"
                  >
                    Memory
                  </button>
                </li>
                <li>
                  <a
                    href="https://github.com/tanmayvaij/diaflow#examples"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Examples
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a
                    href="https://github.com/tanmayvaij/diaflow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/tanmayvaij/diaflow/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Issues
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/tanmayvaij/diaflow/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Discussions
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/package/diaflow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    npm Package
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              MIT © 2025{" "}
              <a
                href="https://github.com/tanmayvaij"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Tanmay Vaij
              </a>
            </p>
            <p className="text-slate-400 text-sm mt-2 sm:mt-0">
              Built with ❤️ for the AI community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DiaFlowDocs;
