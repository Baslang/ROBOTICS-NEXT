const apollo1 = new URL('../assets/images/humanoid_apollo_1_1782031423583.jpg', import.meta.url).href;
const fourierF03 = new URL('../assets/images/humanoid_fourier_f03_1782031442589.jpg', import.meta.url).href;
const unitreeH1 = new URL('../assets/images/humanoid_unitree_h1_1782031467353.jpg', import.meta.url).href;
const cyberEve = new URL('../assets/images/humanoid_cyber_eve_1782031484304.jpg', import.meta.url).href;
const industrialSteel = new URL('../assets/images/humanoid_industrial_steel_1782031499481.jpg', import.meta.url).href;

export interface Robot {
  id: string;
  name: string;
  tag: string;
  purpose: string;
  description: string;
  image: string;
  colorAccent: string;
  specs: {
    torque: string;
    speed: string;
    battery: string;
    actuators: string;
    heightWeight: string;
  };
}

export const ROBOTS_DATA: Robot[] = [
  {
    id: "apollo-1",
    name: "Apollo-1 Venture Frame",
    tag: "HEAVY_LABOR // FACTORY",
    purpose: "Heavy Assembly & Industrial Material Handling",
    description: "An ultra-rugged industrial-grade chassis designed for seamless deployment in automobile lines and dense logistic corridors. Outfitted with torque-dense direct drive joints and shock-resistant carbon alloy shells.",
    image: apollo1,
    colorAccent: "from-[#FF3838] to-[#FF8A8A]",
    specs: {
      torque: "380 Nm Peak",
      speed: "2.4 m/s Max Speed",
      battery: "7.2 kWh / 8 hr Hot-Swap",
      actuators: "38 Active Degrees of Freedom",
      heightWeight: "178cm / 76kg"
    }
  },
  {
    id: "fourier-f03",
    name: "Fourier F.03 Companion",
    tag: "FINE_DEXTERITY // RESEARCH",
    purpose: "Advanced Humanoid Research & Fine Manipulation",
    description: "A research-focused platform famous for sub-millimeter finger precision and responsive self-learning neural engines. Its glossy sensor-packed helmet provides 360-degree real-time LiDAR telemetry.",
    image: fourierF03,
    colorAccent: "from-blue-400 to-cyan-400",
    specs: {
      torque: "140 Nm Peak",
      speed: "1.5 m/s Max Speed",
      battery: "4.8 kWh / 6 hr Operational",
      actuators: "44 Active Degrees of Freedom",
      heightWeight: "165cm / 58kg"
    }
  },
  {
    id: "unitree-h1",
    name: "Unitree H1 Choreographer",
    tag: "HIGH_AGILITY // MOBILITY",
    purpose: "All-Terrain Exploration & High-Velocity Mobility",
    description: "Built for supreme stability on slippery surfaces, this model possesses dynamic balancing algorithm nodes that enable jumps, runs, and backflips. It sets records with hyper-reactive knee tensioners.",
    image: unitreeH1,
    colorAccent: "from-[#FF3838] to-amber-500",
    specs: {
      torque: "360 Nm Knee Joint",
      speed: "3.3 m/s Max Running Speed",
      battery: "6.0 kWh / 5 hr Active",
      actuators: "32 Active Degrees of Freedom",
      heightWeight: "180cm / 71kg"
    }
  },
  {
    id: "cyber-eve",
    name: "Cybernetic Eve Unwrapped",
    tag: "DECOUPLED_CHASSIS // ANATOMY",
    purpose: "Thermal Diagnostic & Core Actuator Mechanical Engine",
    description: "A completely uncovered mechanics chassis demonstrating core hydraulic line routing and light-gauge structural titanium bones. Used for advanced cooling testbeds and hardware performance analysis.",
    image: cyberEve,
    colorAccent: "from-pink-400 to-rose-500",
    specs: {
      torque: "220 Nm Core Joints",
      speed: "1.8 m/s Max Speed",
      battery: "4.0 kWh Tether-supported Core",
      actuators: "48 Fully Instrumented Nodes",
      heightWeight: "172cm / 62kg"
    }
  },
  {
    id: "industrial-steel",
    name: "VEX Dobot Walker-S",
    tag: "SERVER_OPS // LOGISTICS",
    purpose: "Datacenter Operations & Server Mainframe Interfacing",
    description: "A specialized operator chassis armored in premium rustproof steel and protective composite tiles. Perfect for walking along dense datacenter aisles, swapping hot components, and managing connections.",
    image: industrialSteel,
    colorAccent: "from-teal-400 to-emerald-500",
    specs: {
      torque: "310 Nm Spine Core",
      speed: "2.1 m/s Max Speed",
      battery: "8.0 kWh Dual Reservoir",
      actuators: "40 Joint Control Modules",
      heightWeight: "182cm / 81kg"
    }
  },
  {
    id: "agibot-raise-t",
    name: "Agibot Raise-T Precision",
    tag: "COBALT // SPATIAL_COORDINATION",
    purpose: "Micro-Electronic Component Population",
    description: "Highly integrated coordination computer nodes map immediate sub-millimeter joint corrections. Fitted with tactical infrared sensors and active feedback gripper modules to swap fragile IC boards.",
    image: cyberEve, // reuse beautiful cyber body for detail
    colorAccent: "from-violet-500 to-fuchsia-500",
    specs: {
      torque: "110 Nm Fine Grippers",
      speed: "1.2 m/s Max Speed",
      battery: "4.2 kWh Steady Stream",
      actuators: "54 Modular Servos",
      heightWeight: "168cm / 54kg"
    }
  },
  {
    id: "atlas-x",
    name: "VEX Atlas-X Surgeon",
    tag: "BIOMIMETIC // MEDICAL",
    purpose: "Clinical Advisory & Delicate Surgical Assistance",
    description: "A medical humanoid designed with ultra-clean matte skins and warm bio-indicator face LEDs. Provides critical telemetry overlay and holds instruments with static sub-micron stabilization logic.",
    image: apollo1, // crops of premium white model
    colorAccent: "from-emerald-400 to-cyan-500",
    specs: {
      torque: "90 Nm Fine Fingers",
      speed: "1.0 m/s Speed Guard limit",
      battery: "5.5 kWh Sterile Shielded",
      actuators: "52 Precise Servo Nodes",
      heightWeight: "175cm / 68kg"
    }
  },
  {
    id: "tesla-optimus-g2",
    name: "VEX Optimus G2 Dexterous",
    tag: "SOVEREIGN // GENERAL_OPS",
    purpose: "Multi-Domain Logistics & Executive Assistance",
    description: "An elite administrative and service humanoid dressed in high-durability space silver composite plates. Outstanding 11-degree fingers let it hold coffee, handle documents, and write scripts.",
    image: industrialSteel, // premium grey model
    colorAccent: "from-slate-300 to-indigo-400",
    specs: {
      torque: "290 Nm Dynamic Spine",
      speed: "2.6 m/s Max Speed",
      battery: "6.8 kWh Continuous Cell",
      actuators: "42 Multi-Stage Actuators",
      heightWeight: "176cm / 73kg"
    }
  },
  {
    id: "fourier-prime",
    name: "Fourier F.03 Prime",
    tag: "AI_CORE // AUTONOMOUS_LEARNING",
    purpose: "On-Edge Model Training & Cognitive Research",
    description: "Fitted with a dual-redundant liquid-cooled compute array in its back thoracic shell. Actively processes visual streams and creates coordinate path maps in real-time with no server dependency.",
    image: fourierF03, // companion prime
    colorAccent: "from-[#FF3838] to-[#141414]",
    specs: {
      torque: "150 Nm Core Joints",
      speed: "1.6 m/s Max Speed",
      battery: "5.0 kWh Liquid-Cooled",
      actuators: "44 Active Degrees of Freedom",
      heightWeight: "165cm / 59kg"
    }
  },
  {
    id: "ubtech-walker",
    name: "UBTECH Walker Concierge",
    tag: "RECEPTION // SECURITY_NODE",
    purpose: "Dynamic Office Navigation & Building Logistics",
    description: "Equipped with a smart-screen face shield and direct local mapping capabilities. Walker navigates complicated buildings, guides VIP visitors, and coordinates safety status check-ups.",
    image: unitreeH1, // blue visor walker
    colorAccent: "from-cyan-400 to-blue-600",
    specs: {
      torque: "260 Nm Hip Actuators",
      speed: "2.2 m/s Autonomous limit",
      battery: "7.0 kWh Safe-Lock",
      actuators: "36 Active Degrees",
      heightWeight: "181cm / 78kg"
    }
  }
];
