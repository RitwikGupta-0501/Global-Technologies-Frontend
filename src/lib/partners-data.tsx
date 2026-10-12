import React from "react";

export interface BrandItem {
  id: string;
  category: "Software" | "Hardware";
  name: string;
  desc: string;
  longDesc?: string;
  tier: string;
  tierDotColor: string;
  iconType: "symbol" | "svg";
  iconSymbol?: string;
  iconSvg?: React.ReactNode;
  productPath: string;
  popularSolutions: string[];
}

export const allPartners: BrandItem[] = [
  // Enterprise Software Partners
  {
    id: "microsoft",
    category: "Software",
    name: "Microsoft",
    desc: "M365 & Cloud Security",
    longDesc: "Direct Cloud Solution Provider (CSP) agreement offering commercial Volume Licensing, Microsoft 365 Enterprise, and Windows Server CALs with dedicated tenant onboarding.",
    tier: "Direct Cloud CSP",
    tierDotColor: "bg-emerald-500",
    iconType: "svg",
    iconSvg: (
      <svg className="w-6 h-6 shrink-0" viewBox="0 0 23 23">
        <path fill="#F25022" d="M1 1h10v10H1z" />
        <path fill="#7FBA00" d="M12 1h10v10H12z" />
        <path fill="#00A4EF" d="M1 12h10v10H1z" />
        <path fill="#FFB900" d="M12 12h10v10H12z" />
      </svg>
    ),
    productPath: "/software",
    popularSolutions: ["Microsoft 365 Business Premium", "Windows Server 2025 Datacenter", "Defender for Endpoint"],
  },
  {
    id: "redhat",
    category: "Software",
    name: "Red Hat",
    desc: "RHEL & OpenShift Enterprise",
    longDesc: "Official Premier Solution Provider delivering enterprise Linux subscriptions, hybrid cloud virtualization, and OpenShift container infrastructure with direct SLA support.",
    tier: "Premier Solution Provider",
    tierDotColor: "bg-emerald-500",
    iconType: "svg",
    iconSvg: (
      <svg className="w-7 h-6 shrink-0" viewBox="0 0 192 145" fill="none">
        <path d="M140.7 75.3c0-26.4-18.7-38.6-39.6-38.6-13.8 0-25.7 6.4-33.1 16.3-4.5-1.9-9.5-3-14.8-3-16.7 0-30.7 10.7-34.9 25.3-10.7 1.8-18.3 11-18.3 22 0 12.4 10.1 22.4 22.5 22.4h95.6c13.7 0 24.8-11.1 24.8-24.8 0-.9-.1-1.7-.2-2.6 1.8-4.9 3-10.7 3-17z" fill="#EE0000" />
        <path d="M110.4 46.2c9.5 0 20.4 4.8 24.7 15.5H89.2c3.4-10.2 12.9-15.5 21.2-15.5z" fill="#111827" />
      </svg>
    ),
    productPath: "/software",
    popularSolutions: ["Red Hat Enterprise Linux (RHEL)", "OpenShift Container Platform", "Ansible Automation Platform"],
  },
  {
    id: "docker",
    category: "Software",
    name: "Docker",
    desc: "Business Containerization",
    longDesc: "Authorized commercial partner distributing Docker Business and Team seat licensing, enterprise Docker Desktop compliance, and Centralized Management policies.",
    tier: "Authorized Channel Partner",
    tierDotColor: "bg-emerald-500",
    iconType: "svg",
    iconSvg: (
      <svg className="w-7 h-6 shrink-0 fill-[#1D63ED]" viewBox="0 0 24 24">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.186.186v1.887c0 .102.083.185.186.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.186.186 0 00-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.186.186 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.93 0h2.12a.185.185 0 00.184-.186V6.29a.185.185 0 00-.184-.185h-2.12a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm8.814 2.714h2.12a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.12a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186h-2.119a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm-2.93 0h2.12a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186h-2.12a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.93 0h2.12a.185.185 0 00.185-.185V9.006a.186.186 0 00-.185-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185zm-2.93 0h2.12a.185.185 0 00.185-.185V9.006a.186.186 0 00-.185-.186h-2.12a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185zM23.998 11.5c-.12-.808-.755-1.442-1.631-1.644-.57-.132-1.205-.058-1.782.203-.037-.024-.075-.045-.116-.065-.63-.298-1.378-.344-2.072-.119a4.872 4.872 0 00-.472.193c-.158-.293-.362-.56-.607-.79-.908-.857-2.195-1.077-3.324-.572-.058.026-.114.056-.168.087-.134-.14-.282-.266-.443-.377-.978-.673-2.3-.642-3.24.08-.093.071-.18.15-.26.236-.312-.22-.68-.363-1.07-.406-.057-.006-.114-.009-.17-.009h-.033V5.43h.033c.056 0 .113-.003.17-.01.39-.042.758-.185 1.07-.405.08-.086.167-.165.26-.236.94-.722 2.262-.753 3.24-.08.16.11.308.236.442.376.054-.031.11-.06.168-.087 1.13-.505 2.416-.285 3.324.572.245.23.45.497.607.79.15-.07.31-.136.472-.193.694-.225 1.442-.179 2.072.12.04.02.079.04.116.064.577-.26 1.212-.335 1.782-.203.876.202 1.51.836 1.631 1.644.024.16.035.323.035.485 0 .285-.038.567-.11.838a3.174 3.174 0 01-.19.525c-.23.49-.575.908-1.008 1.222 0 .148-.008.297-.024.444-.19 1.72-1.042 3.27-2.39 4.343-1.614 1.285-3.69 1.99-5.834 1.99H5.06c-.66 0-1.3-.23-1.815-.65A2.784 2.784 0 012.2 18.06c-.198-.445-.3-.925-.3-1.418 0-.422.078-.838.23-1.226.166-.425.428-.797.765-1.085-.164-.226-.288-.48-.363-.75-.125-.45-.11-.93.045-1.37.155-.443.438-.82.812-1.086a2.6 2.6 0 01.42-.236 3.1 3.1 0 01.378-.124c-.047-.38.016-.767.185-1.116.2-.41.528-.737.935-.933.407-.197.873-.243 1.312-.132.378.096.716.304.974.597.108-.076.223-.142.344-.196.536-.24 1.155-.262 1.706-.062a2.91 2.91 0 011.025.645c.105.105.197.22.274.345.18-.088.375-.152.578-.19.467-.088.948-.02 1.377.194.43.214.773.565.98 1.002.078.163.134.336.166.514z" />
      </svg>
    ),
    productPath: "/software",
    popularSolutions: ["Docker Business Multi-Seat", "Docker Desktop Enterprise", "Docker Hub Container Registry"],
  },
  {
    id: "autodesk",
    category: "Software",
    name: "Autodesk",
    desc: "AEC & CAD Product Suites",
    longDesc: "Authorized commercial distributor for architecture, engineering, and manufacturing suites including AutoCAD, Revit, and 3ds Max with named-user license administration.",
    tier: "Authorized Channel",
    tierDotColor: "bg-emerald-500",
    iconType: "svg",
    iconSvg: (
      <svg className="w-6 h-6 shrink-0 fill-[#0696D7]" viewBox="0 0 24 24">
        <path d="M12 2L2 22h4.5l2-4.5h7l2 4.5H22L12 2zm0 6l2.3 5.5H9.7L12 8z" />
      </svg>
    ),
    productPath: "/software",
    popularSolutions: ["AutoCAD Commercial Subscription", "Revit BIM Architecture Suite", "Civil 3D Infrastructure"],
  },
  {
    id: "jetbrains",
    category: "Software",
    name: "JetBrains",
    desc: "IDEs & Dev Tooling",
    longDesc: "Commercial licensing partner providing developer tooling suites, IntelliJ IDEA Ultimate, PyCharm, and JetBrains All Products Packs with automated annual true-up handling.",
    tier: "Commercial Partner",
    tierDotColor: "bg-emerald-500",
    iconType: "svg",
    iconSvg: (
      <svg className="w-6 h-6 shrink-0 fill-current" viewBox="0 0 24 24">
        <path d="M4 4h7.5v7.5H4V4zm8.5 0H20v7.5h-7.5V4zM4 12.5h7.5V20H4v-7.5zm8.5 0H20V20h-7.5v-7.5z" />
      </svg>
    ),
    productPath: "/software",
    popularSolutions: ["All Products Pack Commercial", "IntelliJ IDEA Ultimate", "PyCharm Professional"],
  },
  {
    id: "adobe",
    category: "Software",
    name: "Adobe",
    desc: "Creative Cloud Enterprise",
    longDesc: "Authorized VIP Marketplace provider for enterprise Creative Cloud, Acrobat Pro Document Cloud, and Substance 3D corporate teams with consolidated billing.",
    tier: "VIP Marketplace",
    tierDotColor: "bg-emerald-500",
    iconType: "svg",
    iconSvg: (
      <svg className="w-6 h-6 shrink-0 fill-[#FA0F00]" viewBox="0 0 24 24">
        <path d="M14.5 3H21v18h-4.3l-2.2-6.5zm-5 0H3v18h4.3l2.2-6.5zM12 10.8l2.6 7.7H9.4z" />
      </svg>
    ),
    productPath: "/software",
    popularSolutions: ["Creative Cloud All Apps Enterprise", "Acrobat Pro DC Teams", "Substance 3D Collection"],
  },
  {
    id: "crowdstrike",
    category: "Software",
    name: "CrowdStrike",
    desc: "Falcon EDR & Cloud Security",
    longDesc: "Elite Falcon MSSP providing next-gen antivirus, endpoint detection and response (EDR), and cloud workload protection backed by 24/7 managed threat hunting.",
    tier: "Elite Falcon MSSP",
    tierDotColor: "bg-emerald-500",
    iconType: "svg",
    iconSvg: (
      <svg className="w-6 h-6 shrink-0 text-red-600 fill-current" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.54-3.14 8.79-7 9.88-3.86-1.09-7-5.34-7-9.88V6.3l7-3.12zM11 7v6h2V7h-2zm0 8v2h2v-2h-2z" />
      </svg>
    ),
    productPath: "/software",
    popularSolutions: ["Falcon Complete Managed EDR", "Falcon Identity Threat Protection", "Falcon Cloud Workload Security"],
  },
  {
    id: "datadog",
    category: "Software",
    name: "Datadog",
    desc: "Observability & APM Monitoring",
    longDesc: "Cloud Solution Provider delivering full-stack observability, application performance monitoring (APM), and security telemetry for modern microservices architectures.",
    tier: "Cloud Solution Provider",
    tierDotColor: "bg-emerald-500",
    iconType: "svg",
    iconSvg: (
      <svg className="w-6 h-6 shrink-0 text-[#632CA6] fill-current" viewBox="0 0 24 24">
        <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zM8 15h2v-4H8v4zm3 0h2V9h-2v6zm3 0h2v-2h-2v2z" />
      </svg>
    ),
    productPath: "/software",
    popularSolutions: ["Datadog APM & Distributed Tracing", "Infrastructure Metric Monitoring", "Cloud Security Management"],
  },

  // Telematics & IoT Hardware Partners
  {
    id: "meraki",
    category: "Hardware",
    name: "Cisco Meraki",
    desc: "Smart MV Cameras & Gateways",
    longDesc: "Select B2B Integrator for cloud-managed enterprise physical security, smart analytics MV cameras, wireless APs, and SD-WAN security appliances.",
    tier: "Select B2B Integrator",
    tierDotColor: "bg-tertiary",
    iconType: "svg",
    iconSvg: (
      <svg className="w-6 h-6 shrink-0 text-[#00BCEB] fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
    productPath: "/hardware",
    popularSolutions: ["Meraki MV Smart Video Analytics", "Meraki MX Security & SD-WAN", "Cloud Managed MS Switches"],
  },
  {
    id: "garmin",
    category: "Hardware",
    name: "Garmin Fleet",
    desc: "Commercial Telematics & GPS",
    longDesc: "Enterprise Channel Partner providing heavy-duty commercial telematics tablets, truck-specific navigation hardware, and connected fleet management terminals.",
    tier: "Enterprise Channel Partner",
    tierDotColor: "bg-tertiary",
    iconType: "svg",
    iconSvg: (
      <svg className="w-6 h-6 shrink-0 text-[#007CC3] fill-current" viewBox="0 0 24 24">
        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
      </svg>
    ),
    productPath: "/hardware",
    popularSolutions: ["Garmin Fleet 790 Tablet", "dēzl Commercial Truck GPS", "FleetCam Connected Telematics"],
  },
  {
    id: "queclink",
    category: "Hardware",
    name: "Queclink",
    desc: "AIS-140 GPS & OBD Trackers",
    longDesc: "Certified National Importer for ARAI-certified AIS-140 GPS tracking devices, emergency SOS buttons, CAN-bus vehicle decoders, and cold-chain temperature sensors.",
    tier: "Certified Telematics Importer",
    tierDotColor: "bg-tertiary",
    iconType: "svg",
    iconSvg: (
      <svg className="w-6 h-6 shrink-0 text-emerald-600 fill-current" viewBox="0 0 24 24">
        <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4a.996.996 0 101.41 1.41l1.83-1.83C9.17 19.98 10.54 20.5 12 20.5c4.97 0 9-4.03 9-9s-4.03-8.5-9-8.5zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-9h2v4h-2zm0 5h2v2h-2z" />
      </svg>
    ),
    productPath: "/hardware",
    popularSolutions: ["GV300W 4G AIS-140 Tracker", "GB100M Telematics Dongle", "GL500 Real-Time Asset Tracker"],
  },
  {
    id: "blackvue",
    category: "Hardware",
    name: "BlackVue Cloud",
    desc: "Over-the-Cloud 4K Dashcams",
    longDesc: "Direct National Importer supplying commercial 4K UHD dual-channel dashcams, built-in 4G LTE Live View fleet systems, and tamper-proof security enclosures.",
    tier: "Direct National Importer",
    tierDotColor: "bg-tertiary",
    iconType: "svg",
    iconSvg: (
      <svg className="w-6 h-6 shrink-0 text-amber-500 fill-current" viewBox="0 0 24 24">
        <path d="M9.4 10.5l4.77-8.26A9.985 9.985 0 002.05 11h7.35zm3.1 1.5l-4.77 8.26A9.985 9.985 0 0021.95 13h-7.35zm6.85-2.5h-4.85l2.42-4.2a9.96 9.96 0 012.43 4.2zm-9.7 5h4.85l-2.42 4.2a9.96 9.96 0 01-2.43-4.2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6z" />
      </svg>
    ),
    productPath: "/hardware",
    popularSolutions: ["DR970X-2CH Plus 4K Cloud", "DR770X Box Tamper-Proof", "Power Magic Ultra Battery B-130X"],
  },
  {
    id: "viofo",
    category: "Hardware",
    name: "VIOFO",
    desc: "STARVIS 2 4K Dashcams",
    longDesc: "Exclusive India Importer & Warranty Hub featuring Sony STARVIS 2 true 4K HDR sensors, voice notification, and industrial supercapacitor reliability.",
    tier: "India Exclusive Importer",
    tierDotColor: "bg-tertiary",
    iconType: "svg",
    iconSvg: (
      <svg className="w-6 h-6 shrink-0 text-rose-500 fill-current" viewBox="0 0 24 24">
        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z" />
      </svg>
    ),
    productPath: "/hardware",
    popularSolutions: ["A229 Pro 3-Channel 4K STARVIS 2", "A139 Pro 4K HDR Dashcam", "A119 Mini 2 Super Night Vision"],
  },
  {
    id: "70mai",
    category: "Hardware",
    name: "70mai",
    desc: "Smart AI Automotive Tech",
    longDesc: "Authorized National Warranty Hub providing AI motion-tracking 360° dashcams, 4K Sony IMX678 optical sensors, and 24-hour smart parking surveillance systems.",
    tier: "National Warranty Hub",
    tierDotColor: "bg-tertiary",
    iconType: "svg",
    iconSvg: (
      <svg className="w-6 h-6 shrink-0 text-cyan-500 fill-current" viewBox="0 0 24 24">
        <path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zm-2 10H6V7h12v12zm-9-6c-.83 0-1.5-.67-1.5-1.5S8.17 10 9 10s1.5.67 1.5 1.5S9.83 13 9 13zm6 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    ),
    productPath: "/hardware",
    popularSolutions: ["70mai Omni 360° AI Dashcam", "70mai A810 4K HDR", "Hardwire Kit UP03 24H Surveillance"],
  },
  {
    id: "thinkware",
    category: "Hardware",
    name: "Thinkware",
    desc: "Connected ADAS Telematics",
    longDesc: "Fleet Certified Partner distributing premium radar parking surveillance dashcams, lane departure warning systems (ADAS), and IoT cloud fleet tracking.",
    tier: "Fleet Certified",
    tierDotColor: "bg-tertiary",
    iconType: "svg",
    iconSvg: (
      <svg className="w-6 h-6 shrink-0 text-indigo-500 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
      </svg>
    ),
    productPath: "/hardware",
    popularSolutions: ["Thinkware U3000 4K Radar Dashcam", "Thinkware Q1000 2K Connected", "T700 LTE Fleet Monitoring"],
  },
  {
    id: "nextbase",
    category: "Hardware",
    name: "Nextbase",
    desc: "iQ Emergency IoT Systems",
    longDesc: "Authorized Direct Importer for Nextbase iQ smart connected dashcams equipped with AI spatial awareness, Emergency SOS dispatch, and Witness Mode cloud recording.",
    tier: "Authorized Importer",
    tierDotColor: "bg-tertiary",
    iconType: "svg",
    iconSvg: (
      <svg className="w-6 h-6 shrink-0 text-orange-500 fill-current" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm1 14.93V19a1 1 0 01-2 0v-2.07A6.008 6.008 0 016.07 13H4a1 1 0 010-2h2.07A6.008 6.008 0 0111 6.07V4a1 1 0 012 0v2.07A6.008 6.008 0 0117.93 11H20a1 1 0 010 2h-2.07A6.008 6.008 0 0113 16.93zM12 9a3 3 0 103 3 3 3 0 00-3-3z" />
      </svg>
    ),
    productPath: "/hardware",
    popularSolutions: ["Nextbase iQ 4K Smart IoT Dashcam", "Nextbase 622GW 4K Elite", "Emergency SOS Fleet Response"],
  },
];

export const softwarePartners = allPartners.filter((p) => p.category === "Software");
export const hardwarePartners = allPartners.filter((p) => p.category === "Hardware");
