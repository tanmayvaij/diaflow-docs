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
  // Users,
  ExternalLink,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const DiaFlowDocs = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState("");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "features", "quickstart", "docs"];
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
              {/* <NavItem
                isActive={activeSection === "docs"}
                onClick={() => scrollToSection("docs")}
              >
                Docs
              </NavItem> */}
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
                  isActive={activeSection === "docs"}
                  onClick={() => scrollToSection("docs")}
                >
                  Docs
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
                <span>Lightweight AI Agent Framework</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6">
                Build AI Agents with
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  DiaFlow
                </span>
              </h1>

              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                A lightweight AI agent framework built on Google GenAI. Create
                tool-using agents with memory and structured JSON outputs
                powered by Zod. Think LangChain, but simpler.
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
                {`import { Agent, Memory } from "diaflow";
import * as z from "zod";

const agent = new Agent({
  apiKey: process.env.GENAI_API_KEY!,
  tools,
  memory: new Memory(),
  responseJsonSchema: z.object({
    success: z.boolean(),
    message: z.string(),
  }),
});

const result = await agent.runAgent("Create a directory called testdir");
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
                Everything you need to build sophisticated AI agents
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={Code2}
                title="Tool Calling"
                description="Define function declarations and handlers that the model can call to interact with external systems and APIs."
                gradient="from-blue-500 to-blue-600"
              />

              <FeatureCard
                icon={Brain}
                title="Memory Support"
                description="Maintain multi-turn conversations with built-in memory management or run agents statelessly as needed."
                gradient="from-purple-500 to-purple-600"
              />

              <FeatureCard
                icon={Package}
                title="Structured Outputs"
                description="Enforce response schemas using Zod validation to ensure consistent, type-safe JSON outputs."
                gradient="from-green-500 to-green-600"
              />

              <FeatureCard
                icon={Link}
                title="Composable Agents"
                description="Connect multiple agents to form graph-based flows with sequential or parallel execution patterns."
                gradient="from-indigo-500 to-indigo-600"
              />

              <FeatureCard
                icon={Zap}
                title="TypeScript-first"
                description="Full TypeScript support with comprehensive typings for an excellent developer experience."
                gradient="from-orange-500 to-orange-600"
              />

              <FeatureCard
                icon={Terminal}
                title="Lightweight"
                description="Minimal dependencies and clean architecture. No bloated frameworks - just the essentials."
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

                <p className="text-slate-600 mb-4">Create your first agent:</p>

                <CodeBlock language="typescript" id="basic-usage">
                  {`import DiaFlowAgent, { Memory } from "diaflow";
import * as z from "zod";

// Example tools
import { tools } from "./tools";

const agent = new DiaFlowAgent({
  apiKey: process.env.GENAI_API_KEY!,
  tools,
  memory: new Memory(),
  responseJsonSchema: z.object({
    success: z.boolean(),
    message: z.string(),
  }),
});

(async () => {
  const result = await agent.runAgent("Create a directory called testdir");
  console.log(result);
})();`}
                </CodeBlock>
              </div>

              {/* Defining Tools */}
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                  <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  Defining Tools
                </h3>

                <p className="text-slate-600 mb-4">
                  Define tools that your AI agent can use:
                </p>

                <CodeBlock language="typescript" id="tools-example">
                  {`import { Tool } from "diaflow";
import { mkdirSync } from "fs";
import { resolve } from "path";

export const tools: Tool[] = [
  {
    declaration: {
      name: "makeDirectory",
      description: "Creates a directory at the given path",
      parameters: {
        type: "object",
        properties: {
          filePath: { type: "string", description: "Path to create" },
        },
        required: ["filePath"],
      },
    },
    handler: ({ filePath }: { filePath: string }) => {
      mkdirSync(resolve(filePath), { recursive: true });
      return { success: true, message: \`Created at \${filePath}\` };
    },
  },
];`}
                </CodeBlock>
              </div>

              {/* Memory Example */}
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                  <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    4
                  </span>
                  Using Memory
                </h3>

                <p className="text-slate-600 mb-4">
                  Maintain conversation context with memory:
                </p>

                <CodeBlock language="typescript" id="memory-example">
                  {`import { Memory } from "diaflow";

const memory = new Memory();
memory.add({ role: "user", parts: [{ text: "Hello" }] });

console.log(memory.getContent());`}
                </CodeBlock>
              </div>

              <Alert>
                <BookOpen className="h-4 w-4" />
                <AlertDescription>
                  <strong>Next Steps:</strong> Check out the full documentation
                  to learn about advanced features like graph-like execution,
                  custom configurations, and more complex tool integrations.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section id="docs" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Documentation
              </h2>
              <p className="text-xl text-slate-600">
                Complete guide to building with DiaFlow
              </p>
            </div> */}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Code2 className="text-blue-600" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    API Reference
                  </h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Complete API documentation with all available methods,
                  parameters, and examples.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-slate-700">Covers:</div>
                  <ul className="space-y-1 text-slate-600 ml-4">
                    <li>• Agent configuration options</li>
                    <li>• Tool declaration format</li>
                    <li>• Memory management</li>
                    <li>• Response schemas</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <BookOpen className="text-green-600" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    Guides & Tutorials
                  </h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Step-by-step guides to help you build complex AI agent
                  workflows.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-slate-700">Includes:</div>
                  <ul className="space-y-1 text-slate-600 ml-4">
                    <li>• Building your first agent</li>
                    <li>• Advanced tool integration</li>
                    <li>• Graph-like execution patterns</li>
                    <li>• Error handling best practices</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <Terminal className="text-purple-600" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    Examples
                  </h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Real-world examples and code samples to get you started
                  quickly.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-slate-700">Examples:</div>
                  <ul className="space-y-1 text-slate-600 ml-4">
                    <li>• File system operations</li>
                    <li>• API integrations</li>
                    <li>• Multi-agent workflows</li>
                    <li>• Custom tool development</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <Users className="text-orange-600" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    Community
                  </h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Connect with other developers and get help from the community.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-slate-700">Resources:</div>
                  <ul className="space-y-1 text-slate-600 ml-4">
                    <li>• GitHub Discussions</li>
                    <li>• Issue tracking</li>
                    <li>• Contributing guidelines</li>
                    <li>• Roadmap & feature requests</li>
                  </ul>
                </div>
              </div>
            </div> */}

            {/* Key Concepts */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">
                Key Concepts
              </h3>

              <div className="space-y-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-slate-800 mb-3">
                    Agents
                  </h4>
                  <p className="text-slate-600 mb-4">
                    The core component of DiaFlow. Agents orchestrate the
                    interaction between the AI model, tools, and memory systems.
                  </p>
                  <CodeBlock language="typescript" id="agent-concept">
                    {`const agent = new Agent({
  apiKey: process.env.GENAI_API_KEY!,
  model: "gemini-2.0-flash", // Optional, defaults to gemini-2.0-flash
  tools: [...], // Array of tool definitions
  memory: new Memory(), // Optional memory instance
  responseJsonSchema: schema, // Optional Zod schema for structured output
});`}
                  </CodeBlock>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-slate-800 mb-3">
                    Graph-Like Execution
                  </h4>
                  <p className="text-slate-600 mb-4">
                    Chain multiple agents together to create complex workflows
                    with branching, sequencing, or parallel execution.
                  </p>
                  <CodeBlock language="typescript" id="graph-concept">
                    {`const agentA = new Agent({ ... });
const agentB = new Agent({ ... });

const outputA = await agentA.runAgent("Fetch user details");
const outputB = await agentB.runAgent(outputA);`}
                  </CodeBlock>
                </div>
              </div>
            </div>
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
                A lightweight AI agent framework built on Google GenAI. Create
                tool-using agents with memory and structured outputs.
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
                {/* <li>
                  <button
                    onClick={() => scrollToSection("docs")}
                    className="hover:text-white transition-colors"
                  >
                    API Reference
                  </button>
                </li> */}
                {/* <li>
                  <a
                    href="https://github.com/tanmayvaij/diaflow#examples"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Examples
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("docs")}
                    className="hover:text-white transition-colors"
                  >
                    Guides
                  </button>
                </li> */}
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
                {/* <li>
                  <a
                    href="https://github.com/tanmayvaij/diaflow/blob/main/CONTRIBUTING.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Contributing
                  </a>
                </li> */}
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
