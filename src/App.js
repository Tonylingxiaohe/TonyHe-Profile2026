import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  ChevronDown,
  ChevronRight,
  Compass,
  ExternalLink,
  Filter,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Search,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

// ====================== 1) Data ======================
const PROFILE = {
  cnName: "何凌霄",
  enName: "Tony He",
  headlineCN: "地产开发操盘 · 政府各部门对接 · 全流程交付与风险管理",
  headlineEN:
    "Principal-Led Property Developments · End-to-End Delivery & Risk Management",
  introCN:
    "我主导并推进多项联排住宅开发项目（均在公司名下），负责从规划合规、Council 对接到交付落地的整体推进。同时，我正在申请/推进 PhD 入读，研究开发决策在不确定环境下的风险与现金流框架。",
  introEN:
    "I lead and deliver townhouse developments under my own entities, driving end-to-end progress from compliance and Council liaison to delivery. In parallel, I’m pursuing a PhD pathway to formalize a practical decision framework for risk and cashflow under uncertainty.",
  location: "Auckland, New Zealand",
  audiencesCN: ["潜在投资人/合作方", "大学导师/教授"],
  audiencesEN: [
    "Potential investors & partners",
    "University supervisors/professors",
  ],
};

const STRENGTHS = [
  {
    id: "lead",
    icon: BadgeCheck,
    titleCN: "操盘与推进能力",
    titleEN: "Principal-led execution",
    tags: ["Leadership", "Delivery"],
    summaryCN:
      "在真实约束（时间/现金流/合规/多方协作）下推进项目，把复杂问题拆解成可执行路径并闭环。",
    summaryEN:
      "I drive delivery under real constraints (time, cashflow, compliance, stakeholders), breaking complexity into executable paths and closing issues fast.",
    evidence: [
      {
        cn: "多项目并行推进：清晰的节点与责任分工",
        en: "Parallel project delivery with clear milestones & accountability",
      },
      {
        cn: "面对不确定性时，优先锁定关键风险与审批路径",
        en: "Prioritize critical risks and approvals under uncertainty",
      },
    ],
  },
  {
    id: "council",
    icon: Building2,
    titleCN: "Council 对接与合规",
    titleEN: "Council & compliance",
    tags: ["Council", "Compliance"],
    summaryCN:
      "熟悉 Council 沟通节奏与材料逻辑，推动补件、变更、问题澄清，降低审批不确定性。",
    summaryEN:
      "Strong Council liaison: manage documentation, RFIs/variations, clarifications, and reduce approval uncertainty.",
    evidence: [
      {
        cn: "对审批关键点保持前置沟通与快速响应",
        en: "Proactive alignment and fast responses on key approval points",
      },
      {
        cn: "在设计/工程/现场之间搭桥，确保合规闭环",
        en: "Bridge design/engineering/site to close compliance gaps",
      },
    ],
  },
  {
    id: "analysis",
    icon: Compass,
    titleCN: "风险与现金流视角",
    titleEN: "Risk & cashflow lens",
    tags: ["Finance", "Decision"],
    summaryCN:
      "用风险×现金流的视角做关键节点判断，强调可解释、可复用、可落地的决策方式。",
    summaryEN:
      "A practical risk×cashflow approach to milestone decisions—explainable, repeatable, and actionable.",
    evidence: [
      {
        cn: "以“能否交付/能否合规/现金流是否可控”为核心判断维度",
        en: "Decisions framed by deliverability, compliance, and cashflow control",
      },
    ],
  },
];

const PROJECTS = [
  {
    id: "1088",
    name: "1088 Beach Road, Torbay",
    statusCN: "销售阶段",
    statusEN: "Sales stage",
    year: "2024",
    tags: ["Development", "Construction", "Sales"],
    summaryCN:
      "12 套半独立住宅：推进交付与质量管理，协调多方资源，并与销售节奏对齐。",
    summaryEN:
      "12 semi-detached homes: delivery coordination, quality management, stakeholder alignment, and sales-stage execution.",
    driveLink:
      "https://drive.google.com/drive/folders/1xQjhx9NrKz3NhQuxfI3xskPsvtbXNTAE?usp=drive_link",
    bulletsCN: [
      "处理复杂结构/土方/防水等问题",
      "协调多个分包与 Council 流程",
      "推动节点验收与缺陷闭环",
    ],
    bulletsEN: [
      "Handled complex structural/earthworks/waterproofing issues",
      "Coordinated multiple subcontractors and Council processes",
      "Drove inspections and defect closure to keep delivery on track",
    ],
  },
  {
    id: "114",
    name: "114 Don Buck Road, Massey",
    statusCN: "施工中",
    statusEN: "Under construction",
    year: "2025",
    tags: ["Development", "Council", "Design"],
    summaryCN:
      "8 套联排：处理高压线净距风险，与设计/工程/Council 协调合规方案与审批路径。",
    summaryEN:
      "8 townhouses: managed high-voltage clearance risk and aligned compliance pathways with design/engineering/Council.",
    driveLink:
      "https://drive.google.com/drive/folders/1NgFddo0y_TXwLxOzh8rojq7Yn0EQFiPf?usp=drive_link",
    bulletsCN: [
      "评估工程报告与审批时间的权衡",
      "与设计/工程/律师/业主沟通策略",
      "通过方案调整降低审批延误",
    ],
    bulletsEN: [
      "Balanced timing vs cost for engineering reports",
      "Aligned designer/engineer/lawyer/vendor communications",
      "Reduced approval delays via design/staging options",
    ],
  },
  {
    id: "36kirton",
    name: "36 Kirton Crescent, Manurewa",
    statusCN: "已完成（全部售出）",
    statusEN: "Completed (all sold)",
    year: "2023",
    tags: ["Development", "Compliance", "Council"],
    summaryCN:
      "8 套联排：项目已完成并全部售出。我有幸牵头推进整体节奏，并重点负责 Council 对接与合规闭环。",
    summaryEN:
      "8 townhouses: completed and all sold. I had the opportunity to lead overall delivery, with a strong focus on Council liaison and compliance closure.",
    driveLink:
      "https://drive.google.com/drive/folders/1HGNLeF9MYwPUdgVdkqAuXa3o2DJlDe2i?usp=drive_link",
    bulletsCN: [
      "操盘推进：节奏与风险把控",
      "Council 对接：补件、澄清、审批推进",
      "问题闭环：变更、现场协调",
    ],
    bulletsEN: [
      "Principal-led delivery: pace and risk control",
      "Council liaison: RFIs, clarifications, approvals",
      "Issue closure: variations and site coordination",
    ],
  },
];

const RESEARCH = {
  titleCN: "我的研究",
  titleEN: "My Research",
  driveLink:
    "https://drive.google.com/drive/folders/1thgN5CF_raWYx3ZIRbRK7wUSf_j7SBBR?usp=drive_link",
  oneLinerCN: "Coming soon",
  oneLinerEN: "Coming soon",
  sections: [
    {
      id: "question",
      icon: Target,
      titleCN: "研究问题",
      titleEN: "Research Question",
      bulletsCN: [],
      bulletsEN: [],
    },
    {
      id: "gap",
      icon: Filter,
      titleCN: "研究缺口",
      titleEN: "Research Gap",
      bulletsCN: [],
      bulletsEN: [],
    },
    {
      id: "method",
      icon: BookOpen,
      titleCN: "研究方法",
      titleEN: "Methodology",
      bulletsCN: [],
      bulletsEN: [],
    },
    {
      id: "output",
      icon: GraduationCap,
      titleCN: "预期成果",
      titleEN: "Expected Outputs",
      bulletsCN: [],
      bulletsEN: [],
    },
  ],
  faq: [
    {
      qCN: "这项研究对投资人/合作方有什么价值？",
      qEN: "What value does this bring to investors/partners?",
      aCN: "更早识别风险、更清晰解释决策逻辑，提升项目可控性与协作效率。",
      aEN: "Earlier risk identification, clearer decision rationale, better project controllability and collaboration efficiency.",
    },
    {
      qCN: "这是学术研究还是实务工具？",
      qEN: "Is it academic or practical?",
      aCN: "学术方法 + 实务导向：目标是形成开发商可直接使用的工具，而非停留在理论层面。",
      aEN: "Academic rigor with practitioner focus: to produce tools developers can actually use.",
    },
  ],
};

const CONTACT = {
  email: "lingxiao_he_tony@hotmail.com",
  phone: "+64223219900",
  links: [
    {
      label: "Corestone Construction",
      href: "https://corestoneconstruction.co.nz/",
    },
  ],
};

// ====================== Helpers ======================
function cx(...xs) {
  return xs.filter(Boolean).join(" ");
}
function t(cn, en, lang = "CN") {
  return lang === "CN" ? cn : en;
}

function Button({
  children,
  className,
  variant = "primary",
  onClick,
  as = "button",
  href,
  target,
  rel,
}) {
  const Comp = as;
  return (
    <Comp
      className={cx(
        "btn",
        variant === "outline" && "btn_outline",
        variant === "ghost" && "btn_ghost",
        className
      )}
      onClick={onClick}
      href={href}
      target={target}
      rel={rel}
    >
      {children}
    </Comp>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="secTitle">
      <div className="secIcon">
        <Icon className="secIco" />
      </div>
      <div>
        <div className="secH">{title}</div>
        <div className="secSub">{subtitle}</div>
      </div>
    </div>
  );
}

function Chip({ active, onClick, label }) {
  return (
    <button className={cx("chipBtn", active && "chipBtnOn")} onClick={onClick}>
      {label}
    </button>
  );
}

function Card({ children, onClick, className }) {
  return (
    <motion.div
      className={cx("card", className)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </motion.div>
  );
}

function Accordion({ items, lang, comingSoon = false }) {
  const [openId, setOpenId] = useState(items?.[0]?.id || null);
  return (
    <div className="acc">
      {items.map((it) => {
        const isOpen = openId === it.id;
        const Icon = it.icon;
        return (
          <div key={it.id} className="accItem">
            <button
              className="accHead"
              onClick={() => setOpenId(isOpen ? null : it.id)}
            >
              <div className="accHeadL">
                <div className="accIcon">
                  <Icon className="accIco" />
                </div>
                <div className="accTitle">
                  {t(it.titleCN, it.titleEN, lang)}
                </div>
              </div>
              <ChevronDown
                className={cx("accChevron", isOpen && "accChevronOn")}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="accBody"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <ul className="bullets">
                    {(comingSoon ? ["Coming soon"] : []).map((b, idx) => (
                      <li key={idx} className="bullet">
                        <span className="dot" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function FAQ({ items, lang }) {
  const [open, setOpen] = useState(items?.[0]?.qEN || null);
  return (
    <div className="faq">
      {items.map((it, idx) => {
        const key = it.qEN || idx;
        const isOpen = open === key;
        return (
          <div key={key} className="faqItem">
            <button
              className="faqQ"
              onClick={() => setOpen(isOpen ? null : key)}
            >
              <span>{t(it.qCN, it.qEN, lang)}</span>
              <ChevronRight className={cx("faqChev", isOpen && "faqChevOn")} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="faqA"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {t(it.aCN, it.aEN, lang)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function Modal({ open, onClose, title, subtitle, children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal"
            initial={{ y: 16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
          >
            <div className="modalTop">
              <div>
                <div className="modalTitle">{title}</div>
                <div className="modalSub">{subtitle}</div>
              </div>
              <button className="xBtn" onClick={onClose} aria-label="Close">
                ✕
              </button>
            </div>
            <div className="modalBody">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [lang, setLang] = useState("EN");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [active, setActive] = useState(null);

  const allTags = useMemo(() => {
    const set = new Set(["All"]);
    STRENGTHS.forEach((s) => s.tags.forEach((x) => set.add(x)));
    PROJECTS.forEach((p) => p.tags.forEach((x) => set.add(x)));
    return Array.from(set);
  }, []);

  const filteredStrengths = useMemo(() => {
    return STRENGTHS.filter((s) => {
      const okTag = tag === "All" ? true : s.tags.includes(tag);
      const text =
        `${s.titleCN} ${s.titleEN} ${s.summaryCN} ${s.summaryEN}`.toLowerCase();
      const okQ = query ? text.includes(query.toLowerCase()) : true;
      return okTag && okQ;
    });
  }, [tag, query]);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const okTag = tag === "All" ? true : p.tags.includes(tag);
      const text = `${p.name} ${p.summaryCN} ${p.summaryEN}`.toLowerCase();
      const okQ = query ? text.includes(query.toLowerCase()) : true;
      return okTag && okQ;
    });
  }, [tag, query]);

  const pageT = (cn, en) => t(cn, en, lang);

  return (
    <div className="app">
      <style>{css}</style>

      <div className="topbar">
        <div className="wrap topbarInner">
          <div className="brand">
            <div className="logo">
              <Sparkles className="logoIco" />
            </div>
            <div className="brandText">
              <div className="brandName">
                {PROFILE.enName} · {PROFILE.cnName}
                <div className="langSeg" role="tablist" aria-label="Language">
                  <button
                    className={cx("langPill", lang === "EN" && "langPillOn")}
                    onClick={() => setLang("EN")}
                    aria-pressed={lang === "EN"}
                  >
                    English
                  </button>
                  <button
                    className={cx("langPill", lang === "CN" && "langPillOn")}
                    onClick={() => setLang("CN")}
                    aria-pressed={lang === "CN"}
                  >
                    中文
                  </button>
                </div>
              </div>
              <div className="brandSub">
                {pageT("个人展示页", "Personal Profile")}
              </div>
            </div>
          </div>

          <div className="topActions">
            <div className="nav">
              <a href="#strengths">{pageT("优势", "Strengths")}</a>
              <a href="#projects">{pageT("项目", "Projects")}</a>
              <a href="#research">{pageT("研究", "Research")}</a>
              <a href="#contact">{pageT("联系", "Contact")}</a>
            </div>

            <Button
              variant="outline"
              className="cta"
              onClick={() => setActive({ kind: "contact" })}
            >
              {pageT("联系我", "Contact")}
              <ArrowRight className="btnIco" />
            </Button>
          </div>
        </div>
      </div>

      <div id="top" className="hero">
        <div className="wrap heroGrid">
          <div>
            <div className="kicker">
              <MapPin className="kIco" />
              <span>{PROFILE.location}</span>
            </div>
            <div className="heroTitle">
              {pageT(PROFILE.headlineCN, PROFILE.headlineEN)}
            </div>
            <div className="heroIntro">
              {pageT(PROFILE.introCN, PROFILE.introEN)}
            </div>

            <div className="heroChips">
              {(lang === "CN" ? PROFILE.audiencesCN : PROFILE.audiencesEN).map(
                (x) => (
                  <span key={x} className="pill">
                    <Users className="pillIco" />
                    {x}
                  </span>
                )
              )}
            </div>

            <div className="heroBtns">
              <Button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {pageT("查看项目与案例", "View Projects")}
                <ChevronRight className="btnIco" />
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("research")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {pageT("我的研究", "My Research")}
                <GraduationCap className="btnIco" />
              </Button>
            </div>
          </div>

          <div className="heroRight">
            <div className="searchCard">
              <div className="searchRow">
                <div className="searchIcon">
                  <Search className="sIco" />
                </div>
                <input
                  className="searchInput"
                  placeholder={pageT(
                    "搜索优势/项目关键词…",
                    "Search strengths/projects…"
                  )}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                  variant="ghost"
                  className="clearBtn"
                  onClick={() => setQuery("")}
                >
                  {pageT("清除", "Clear")}
                </Button>
              </div>

              <div className="tagRow">
                <div className="tagLabel">
                  <Filter className="tagIco" />
                  {pageT("标签筛选", "Filter")}
                </div>
                <div className="tagChips">
                  {allTags.map((x) => (
                    <Chip
                      key={x}
                      label={x}
                      active={tag === x}
                      onClick={() => setTag(x)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="note">
              <div className="noteTop">
                <Briefcase className="noteIco" />
                <div className="noteTitle">
                  {pageT("给投资人与合作方", "For investors & partners")}
                </div>
              </div>
              <div className="noteBody">
                {pageT(
                  "每个项目都提供一个 Google Drive 链接，包含图片便于快速了解。（详细图纸、Council 往来与关键材料可按需提供。）",
                  "Each project features a Google Drive link with images for quick review. (Detailed drawings, Council correspondence, and key materials are available upon request.)"
                )}
              </div>
            </div>

            <div className="note">
              <div className="noteTop">
                <GraduationCap className="noteIco" />
                <div className="noteTitle">
                  {pageT(
                    "给大学导师/教授",
                    "For university supervisors/professors"
                  )}
                </div>
              </div>
              <div className="noteBody">
                {pageT(
                  "我目前处于入读申请前期阶段，正在与潜在导师沟通并完善研究框架。研究提案与相关支撑材料在最终定稿后，将统一放入共享资料夹供查阅。",
                  "I am currently in the pre-application stage, refining my research framework in consultation with potential academic supervisors. The full research proposal and supporting materials will be available in the shared folder once finalized."
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="strengths" className="section">
        <div className="wrap">
          <SectionTitle
            icon={BadgeCheck}
            title={pageT("我的优势", "Strengths")}
            subtitle={pageT(
              "我尽力把复杂的开发工作做得更可控、更清晰，也仍在不断学习与迭代。",
              "I aim to make complex development work more controllable and clear—and I’m still learning and improving."
            )}
          />

          <div className="grid3">
            {filteredStrengths.map((s) => {
              const Icon = s.icon;
              return (
                <Card
                  key={s.id}
                  onClick={() => setActive({ kind: "strength", item: s })}
                >
                  <div className="cardTop">
                    <div className="cardIcon">
                      <Icon className="cIco" />
                    </div>
                  </div>
                  <div className="cardTitle">{pageT(s.titleCN, s.titleEN)}</div>
                  <div className="cardText">
                    {pageT(s.summaryCN, s.summaryEN)}
                  </div>
                  <div className="cardFooter">
                    <div className="chipsSmall">
                      {s.tags.map((x) => (
                        <span key={x} className="chipSm">
                          {x}
                        </span>
                      ))}
                    </div>
                    <div className="more">
                      {pageT("查看", "View")} <ArrowRight className="moreIco" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <div id="projects" className="section">
        <div className="wrap">
          <SectionTitle
            icon={Building2}
            title={pageT("项目与案例", "Projects & Case Studies")}
            subtitle={pageT(
              "这些项目由我牵头推进，过程中也得益于合作伙伴与团队的支持，共同把事情落地。",
              "I’ve had the opportunity to lead these projects with strong support from partners and teams to get things delivered."
            )}
          />

          <div className="grid3">
            {filteredProjects.map((p) => (
              <Card
                key={p.id}
                onClick={() => setActive({ kind: "project", item: p })}
              >
                <div className="projTop">
                  <div className="projTitle">{p.name}</div>
                  <div className="projMeta">
                    {pageT(p.statusCN, p.statusEN)} · {p.year}
                  </div>
                </div>
                <div className="cardText">
                  {pageT(p.summaryCN, p.summaryEN)}
                </div>
                <div className="chipsSmall">
                  {p.tags.map((x) => (
                    <span key={x} className="chipSm">
                      {x}
                    </span>
                  ))}
                </div>
                <div className="cardFooter">
                  <div className="more">
                    {pageT("查看详情", "Details")}{" "}
                    <ArrowRight className="moreIco" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div id="research" className="section">
        <div className="wrap">
          <SectionTitle
            icon={GraduationCap}
            title={pageT(RESEARCH.titleCN, RESEARCH.titleEN)}
            subtitle={pageT(
              "做成可读、可用的框架，而不是只停留在理论。",
              "A readable, usable framework—not just theory."
            )}
          />

          <div className="phdGrid">
            <div className="phdLeft">
              <div className="phdCard">
                <div className="phdKicker">
                  {pageT("一句话说明", "One-liner")}
                </div>
                <div className="phdOne">
                  {pageT(RESEARCH.oneLinerCN, RESEARCH.oneLinerEN)}
                </div>
                <div className="phdBtns">
                  <Button onClick={() => setActive({ kind: "research" })}>
                    {pageT("查看结构化摘要", "Open structured summary")}
                    <ArrowRight className="btnIco" />
                  </Button>
                  <Button
                    variant="outline"
                    as="a"
                    href={RESEARCH.driveLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {pageT("研究资料（Drive）", "Research materials (Drive)")}
                    <ExternalLink className="btnIco" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="phdRight">
              <div className="phdPanel">
                <div className="phdRightTop">
                  <BookOpen className="phdIco" />
                  <div>
                    <div className="phdRightTitle">
                      {pageT("研究地图", "Research Map")}
                    </div>
                    <div className="phdRightSub">
                      {pageT(
                        "让别人一眼明白你的研究价值",
                        "Help others quickly understand the value"
                      )}
                    </div>
                  </div>
                </div>
                <FAQ items={RESEARCH.faq} lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="contact" className="section last">
        <div className="wrap">
          <SectionTitle
            icon={Mail}
            title={pageT("联系方式", "Contact")}
            subtitle={pageT(
              "填写你的联系方式，并提供关键资料链接（项目/研究）。",
              "Add your contact details and key links (projects/research)."
            )}
          />

          <div className="contactGrid">
            <div className="contactCard">
              <div className="contactRow">
                <Mail className="cIcoSmall" />
                <div className="cLabel">{pageT("邮箱", "Email")}</div>
                <div className="cValue">{CONTACT.email}</div>
              </div>
              <div className="contactRow">
                <Phone className="cIcoSmall" />
                <div className="cLabel">{pageT("电话", "Phone")}</div>
                <div className="cValue">{CONTACT.phone}</div>
              </div>
              <div className="contactRow">
                <MapPin className="cIcoSmall" />
                <div className="cLabel">{pageT("位置", "Location")}</div>
                <div className="cValue">{PROFILE.location}</div>
              </div>
              <Button
                className="wide"
                onClick={() => setActive({ kind: "contact" })}
              >
                {pageT("打开联系卡片", "Open contact card")}
                <ArrowRight className="btnIco" />
              </Button>
            </div>

            <div className="contactCard">
              <div className="contactLinksTitle">{pageT("链接", "Links")}</div>
              <div className="linkList">
                {CONTACT.links.map((l) => (
                  <a
                    key={l.label}
                    className="linkItem"
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{l.label}</span>
                    <ExternalLink className="lIco" />
                  </a>
                ))}
              </div>
              <div className="hint">
                {pageT(
                  "提示：项目与研究的 Drive 资料入口在各自的详情弹窗里。",
                  "Tip: Drive folders for projects & research are inside each detail modal."
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={
          active?.kind === "strength"
            ? pageT(active.item.titleCN, active.item.titleEN)
            : active?.kind === "project"
            ? active.item.name
            : active?.kind === "research"
            ? pageT(RESEARCH.titleCN, RESEARCH.titleEN)
            : pageT("联系我", "Contact")
        }
        subtitle={
          active?.kind === "strength"
            ? pageT("证据与描述", "Evidence & description")
            : active?.kind === "project"
            ? pageT("项目详情", "Project details")
            : active?.kind === "research"
            ? pageT("研究摘要", "Research summary")
            : pageT("快速联系与链接", "Quick contact & links")
        }
      >
        {active?.kind === "strength" && (
          <div className="modalStack">
            <div className="modalBox">
              <div className="modalBoxTop">
                <div className="modalBoxTitle">{pageT("概述", "Summary")}</div>
              </div>
              <div className="modalText">
                {pageT(active.item.summaryCN, active.item.summaryEN)}
              </div>
              <div className="tagChips">
                {active.item.tags.map((x) => (
                  <span key={x} className="chip">
                    {x}
                  </span>
                ))}
              </div>
            </div>

            <div className="modalBox">
              <div className="modalBoxTitle">{pageT("证据点", "Evidence")}</div>
              <ul className="bullets">
                {active.item.evidence.map((e, idx) => (
                  <li key={idx} className="bullet">
                    <span className="dot" />
                    <span>{pageT(e.cn, e.en)}</span>
                  </li>
                ))}
              </ul>
              <div className="hint">
                {pageT(
                  "你可以把每条证据补上：时间、角色、动作、结果（最好加图片/链接）。",
                  "Add: time, role, actions, outcomes (ideally images/links)."
                )}
              </div>
            </div>
          </div>
        )}

        {active?.kind === "project" && (
          <div className="modalStack">
            <div className="modalBox">
              <div className="projMeta">
                {pageT(active.item.statusCN, active.item.statusEN)} ·{" "}
                {active.item.year}
              </div>
              <div className="modalText">
                {pageT(active.item.summaryCN, active.item.summaryEN)}
              </div>
              <div className="tagChips">
                {active.item.tags.map((x) => (
                  <span key={x} className="chip">
                    {x}
                  </span>
                ))}
              </div>
            </div>

            <div className="modalBox">
              <div className="modalBoxTitle">
                {pageT("你做了什么", "What you did")}
              </div>
              <ul className="bullets">
                {(lang === "CN"
                  ? active.item.bulletsCN
                  : active.item.bulletsEN
                ).map((b, idx) => (
                  <li key={idx} className="bullet">
                    <span className="dot" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="hint">
                {pageT(
                  "建议补充：关键数据（预算/工期/单位数/销售结果）+ 一个具体难题的解决过程。",
                  "Add key metrics + one concrete challenge and how you solved it."
                )}
              </div>
            </div>

            {active.item.driveLink && (
              <div className="modalBox">
                <div className="modalBoxTitle">
                  {pageT("资料与文件", "Files & documents")}
                </div>
                <a
                  className="linkBtn"
                  href={active.item.driveLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>
                    {pageT(
                      "打开 Google Drive 文件夹",
                      "Open Google Drive folder"
                    )}
                  </span>
                  <ExternalLink className="btnIco" />
                </a>
                <div className="hint">
                  {pageT(
                    "包含图片与阶段材料（按权限可见）。",
                    "Contains images and key project materials (subject to access)."
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {active?.kind === "research" && (
          <div className="modalStack">
            <div className="modalBox">
              <div className="modalBoxTitle">
                {pageT("一句话说明", "One-liner")}
              </div>
              <div className="modalText">
                {pageT("Coming soon", "Coming soon")}
              </div>
            </div>

            <div className="modalBox">
              <div className="modalBoxTitle">
                {pageT("结构化摘要", "Structured summary")}
              </div>
              <Accordion
                items={RESEARCH.sections}
                lang={lang}
                comingSoon={true}
              />
            </div>

            {RESEARCH.driveLink && (
              <div className="modalBox">
                <div className="modalBoxTitle">
                  {pageT("研究材料", "Research materials")}
                </div>
                <a
                  className="linkBtn"
                  href={RESEARCH.driveLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>
                    {pageT(
                      "打开 Google Drive 文件夹",
                      "Open Google Drive folder"
                    )}
                  </span>
                  <ExternalLink className="btnIco" />
                </a>
              </div>
            )}
          </div>
        )}

        {active?.kind === "contact" && (
          <div className="modalStack">
            <div className="modalBox">
              <div className="contactRow">
                <Mail className="cIcoSmall" />
                <div className="cLabel">{pageT("邮箱", "Email")}</div>
                <div className="cValue">{CONTACT.email}</div>
              </div>
              <div className="contactRow">
                <Phone className="cIcoSmall" />
                <div className="cLabel">{pageT("电话", "Phone")}</div>
                <div className="cValue">{CONTACT.phone}</div>
              </div>
            </div>
            <div className="modalBox">
              <div className="modalBoxTitle">{pageT("链接", "Links")}</div>
              <div className="linkList">
                {CONTACT.links.map((l) => (
                  <a
                    key={l.label}
                    className="linkItem"
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{l.label}</span>
                    <ExternalLink className="lIco" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

const css = `
:root{--bg:#0b1220;--shadow:0 18px 50px rgba(0,0,0,.35);--shadow2:0 10px 30px rgba(0,0,0,.25);--radius:18px;--radius2:24px;--text:rgba(255,255,255,.92);--muted:rgba(255,255,255,.70);--muted2:rgba(255,255,255,.55);} 
*{box-sizing:border-box;} html,body{margin:0;padding:0;background:radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,.25), transparent 55%),radial-gradient(900px 500px at 90% 20%, rgba(34,197,94,.18), transparent 50%),radial-gradient(800px 600px at 70% 90%, rgba(236,72,153,.18), transparent 60%),var(--bg);color:var(--text);font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;} 
.wrap{width:min(1120px, calc(100% - 32px)); margin:0 auto;} .app{padding-bottom:40px;} 
.topbar{position:sticky;top:0;z-index:20;backdrop-filter:blur(12px);background:rgba(11,18,32,.55);border-bottom:1px solid rgba(255,255,255,.08);} 
.topbarInner{display:flex;align-items:center;justify-content:space-between;padding:14px 0;} 
.brand{display:flex;align-items:center;gap:12px;} 
.logo{width:40px;height:40px;border-radius:14px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow2);} 
.logoIco{width:20px;height:20px;} 
.brandText{display:flex;flex-direction:column;gap:2px;} 
.brandName{font-weight:850;letter-spacing:.2px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;} 
.brandSub{font-size:12px;color:var(--muted2);} 
.topActions{display:flex;align-items:center;gap:14px;} 
.nav{display:flex;gap:12px;align-items:center;font-size:13px;color:var(--muted);} 
.nav a{padding:8px 10px;border-radius:12px;color:inherit;text-decoration:none;} 
.nav a:hover{background:rgba(255,255,255,.08);} 
.btn{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:14px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.14);color:var(--text);font-weight:750;cursor:pointer;box-shadow:var(--shadow2);} 
.btn:hover{background:rgba(255,255,255,.18);} .btn_outline{background:transparent;} .btn_outline:hover{background:rgba(255,255,255,.08);} .btn_ghost{background:transparent;border-color:transparent;box-shadow:none;} .btn_ghost:hover{background:rgba(255,255,255,.08);} 
.btnIco{width:16px;height:16px;} .cta{white-space:nowrap;} .clearBtn{padding:8px 10px;font-weight:700;} .wide{width:100%;justify-content:center;} 
.hero{padding:26px 0 10px;} .heroGrid{display:grid;grid-template-columns:1.05fr .95fr;gap:18px;align-items:start;} 
.kicker{display:inline-flex;align-items:center;gap:8px;padding:8px 10px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:999px;color:var(--muted);font-size:12px;} 
.kIco{width:14px;height:14px;} .heroTitle{font-size:44px;line-height:1.06;font-weight:900;margin:14px 0 10px;} 
.heroIntro{color:var(--muted);font-size:15px;line-height:1.6;max-width:62ch;} 
.heroChips{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0;} 
.pill{display:inline-flex;align-items:center;gap:8px;padding:8px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.08);color:var(--muted);font-size:12px;} 
.pillIco{width:14px;height:14px;} .heroBtns{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px;} 
.heroRight{display:flex;flex-direction:column;gap:12px;} 
.searchCard{padding:14px;border-radius:var(--radius2);border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.06);box-shadow:var(--shadow2);} 
.searchRow{display:flex;align-items:center;gap:10px;} 
.searchIcon{width:34px;height:34px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.12);} 
.sIco{width:16px;height:16px;} 
.searchInput{flex:1;background:transparent;border:none;outline:none;color:var(--text);font-size:14px;} 
.tagRow{margin-top:12px;} .tagLabel{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:12px;margin-bottom:8px;} 
.tagIco{width:14px;height:14px;} .tagChips{display:flex;gap:8px;flex-wrap:wrap;} 
.chipBtn{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);color:var(--muted);border-radius:999px;padding:7px 10px;font-size:12px;cursor:pointer;} 
.chipBtnOn{background:rgba(255,255,255,.18);color:var(--text);} 
.note{padding:14px;border-radius:var(--radius2);border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.06);box-shadow:var(--shadow2);} 
.noteTop{display:flex;align-items:center;gap:10px;margin-bottom:6px;} .noteIco{width:18px;height:18px;} .noteTitle{font-weight:850;} .noteBody{color:var(--muted);font-size:13px;line-height:1.55;} 
.section{padding:18px 0;} .section.last{padding-bottom:8px;} 
.secTitle{display:flex;gap:12px;align-items:flex-start;margin:6px 0 14px;} 
.secIcon{width:40px;height:40px;border-radius:16px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.12);} 
.secIco{width:18px;height:18px;} .secH{font-size:18px;font-weight:900;} .secSub{color:var(--muted);font-size:13px;line-height:1.5;margin-top:2px;} 
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;} 
.card{padding:14px;border-radius:var(--radius2);border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.06);box-shadow:var(--shadow2);cursor:pointer;display:flex;flex-direction:column;gap:10px;min-height:180px;} 
.cardTop{display:flex;align-items:center;justify-content:space-between;} 
.cardIcon{width:38px;height:38px;border-radius:16px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.12);} 
.cIco{width:18px;height:18px;} .cardTitle{font-weight:900;} .cardText{color:var(--muted);font-size:13px;line-height:1.5;} 
.cardFooter{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:auto;} 
.more{display:flex;align-items:center;gap:8px;color:var(--text);font-weight:800;font-size:13px;} 
.moreIco{width:16px;height:16px;} 
.chipsSmall{display:flex;gap:6px;flex-wrap:wrap;} 
.chipSm{font-size:11px;color:var(--muted);padding:5px 8px;border-radius:999px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.05);} 
.projTop{display:flex;flex-direction:column;gap:2px;} .projTitle{font-weight:900;} .projMeta{color:var(--muted2);font-size:12px;} 
.phdGrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;} 
.phdCard,.phdPanel{padding:14px;border-radius:var(--radius2);border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.06);box-shadow:var(--shadow2);} 
.phdKicker{color:var(--muted2);font-size:12px;} .phdOne{font-weight:850;margin-top:6px;line-height:1.45;} .phdBtns{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px;} 
.phdRightTop{display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;} .phdIco{width:20px;height:20px;} .phdRightTitle{font-weight:900;} .phdRightSub{color:var(--muted);font-size:13px;margin-top:2px;} 
.accItem{border-top:1px solid rgba(255,255,255,.10);} .accItem:first-child{border-top:none;} 
.accHead{width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 0;background:transparent;border:none;cursor:pointer;color:var(--text);} 
.accHeadL{display:flex;align-items:center;gap:10px;} 
.accIcon{width:30px;height:30px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.12);} 
.accIco{width:16px;height:16px;} .accTitle{font-weight:850;} .accChevron{width:18px;height:18px;opacity:.7;transition:transform .18s ease;} .accChevronOn{transform:rotate(180deg);} 
.accBody{overflow:hidden;} 
.bullets{margin:0 0 10px;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px;} 
.bullet{display:flex;gap:10px;align-items:flex-start;color:var(--muted);font-size:13px;line-height:1.5;} 
.dot{width:8px;height:8px;border-radius:999px;background:rgba(255,255,255,.55);margin-top:7px;} 
.faqItem{border-top:1px solid rgba(255,255,255,.10);padding:10px 0;} .faqItem:first-child{border-top:none;} 
.faqQ{width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;background:transparent;border:none;cursor:pointer;color:var(--text);font-weight:850;} 
.faqChev{width:18px;height:18px;opacity:.7;transition:transform .18s ease;} .faqChevOn{transform:rotate(90deg);} 
.faqA{overflow:hidden;color:var(--muted);font-size:13px;line-height:1.55;padding-top:8px;} 
.contactGrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;} 
.contactCard{padding:14px;border-radius:var(--radius2);border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.06);box-shadow:var(--shadow2);display:flex;flex-direction:column;gap:10px;} 
.contactRow{display:grid;grid-template-columns:20px 64px 1fr;gap:10px;align-items:center;} 
.cIcoSmall{width:18px;height:18px;opacity:.85;} .cLabel{color:var(--muted2);font-size:12px;} .cValue{font-weight:800;} 
.contactLinksTitle{font-weight:900;} .linkList{display:flex;flex-direction:column;gap:8px;} 
.linkItem{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;border-radius:14px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.06);color:inherit;text-decoration:none;} 
.lIco{width:16px;height:16px;opacity:.85;} .hint{color:var(--muted2);font-size:12px;line-height:1.5;} 
.backdrop{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:50;} 
.modal{position:fixed;z-index:60;top:50%;left:50%;transform:translate(-50%,-50%);width:min(820px, calc(100% - 24px));max-height:86vh;overflow:auto;border-radius:22px;border:1px solid rgba(255,255,255,.12);background:rgba(11,18,32,.92);box-shadow:var(--shadow);backdrop-filter:blur(14px);} 
.modalTop{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:16px 16px 12px;border-bottom:1px solid rgba(255,255,255,.10);} 
.modalTitle{font-size:18px;font-weight:900;} .modalSub{color:var(--muted2);font-size:12px;margin-top:3px;} 
.xBtn{width:36px;height:36px;border-radius:14px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.06);color:var(--text);cursor:pointer;} 
.modalBody{padding:14px 16px 16px;} .modalStack{display:flex;flex-direction:column;gap:12px;} 
.modalBox{padding:14px;border-radius:18px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.06);} 
.modalBoxTop{display:flex;align-items:center;justify-content:space-between;gap:10px;} 
.modalBoxTitle{font-weight:900;margin-bottom:8px;} 
.modalText{color:var(--muted);font-size:13px;line-height:1.6;} 
.chip{font-size:12px;padding:7px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.05);color:var(--muted);} 
.langSeg{display:inline-flex;margin-left:10px;padding:3px;border:1px solid rgba(15,23,42,.12);border-radius:999px;background:rgba(255,255,255,.65);gap:4px;vertical-align:middle;} 
.langPill{border:0;background:transparent;padding:6px 10px;border-radius:999px;font-weight:700;font-size:12px;color:#0f172a;cursor:pointer;} 
.langPillOn{background:#0f172a;color:#fff;} 
.linkBtn{display:inline-flex;align-items:center;justify-content:space-between;gap:10px;width:100%;padding:12px 14px;border-radius:14px;border:1px solid rgba(15,23,42,.12);background:rgba(255,255,255,.7);color:#0f172a;font-weight:700;text-decoration:none;} 
.linkBtn:hover{transform:translateY(-1px);} 
@media (max-width:960px){.heroGrid{grid-template-columns:1fr;}.grid3{grid-template-columns:1fr 1fr;}.phdGrid{grid-template-columns:1fr;}} 
@media (max-width:720px){.nav{display:none;}.grid3{grid-template-columns:1fr;}.contactGrid{grid-template-columns:1fr;}.heroTitle{font-size:32px;}} 
`;
