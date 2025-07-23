// // components/PluginLogos.tsx

// import { SiSupabase, SiTailwindcss, SiNextdotjs, SiMongodb, SiRadixui, SiNodedotjs } from "react-icons/si";
// import { FaReact } from "react-icons/fa";
// import { Card } from "@/components/ui/card"; // optional if you're using shadcn/ui

// const plugins = [
//   { name: "React", icon: <FaReact className="text-blue-500" /> },
//   { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" /> },
//   { name: "Supabase", icon: <SiSupabase className="text-green-500" /> },
//   { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" /> },
//   { name: "Radix UI", icon: <SiRadixui className="text-purple-500" /> },
//   { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
//   { name: "Node.js", icon: <SiNodedotjs className="text-green-700" /> },
// //   { icon: "/icons/waterproof.svg", label: "Waterproof" },
// //   { icon: "/icons/fireproof.svg", label: "Fire Retardant" },
// //   { icon: "/icons/easy-install.svg", label: "Easy Installation" },
// //   { icon: "/icons/eco-friendly.svg", label: "Eco-Friendly" },

// ];

// const PluginLogos = () => {
//   return (
//     <div className="grid grid-cols-3 gap-4 p-4 md:grid-cols-4 lg:grid-cols-6">
//       {plugins.map((plugin) => (
//         <Card key={plugin.name} className="flex flex-col items-center justify-center p-4 shadow-md">
//           <div className="text-4xl">{plugin.icon}</div>
//           <span className="mt-2 text-sm font-medium">{plugin.name}</span>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default PluginLogos;
// components/USPGrid.tsx

import Image from "next/image";
// components/USPGrid.tsx
// import WaterDropIcon from '@mui/icons-material/WaterDrop';
// import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
// import ConstructionIcon from '@mui/icons-material/Construction';
// import EcoIcon from '@mui/icons-material/Compost';
// const usps = [
//   { icon: <WaterDropIcon className="text-primary text-4xl" />, label: "Waterproof" },
//   { icon: <LocalFireDepartmentIcon className="text-primary text-4xl" />, label: "Fire Retardant" },
//   { icon: <ConstructionIcon className="text-primary text-4xl" />, label: "Easy Installation" },
//   { icon: <EcoIcon className="text-primary text-4xl" />, label: "Eco-Friendly" },
// ];
import BuildIcon from "@mui/icons-material/Build";                  // Free Installation
import LocalShippingIcon from "@mui/icons-material/LocalShipping";  // Free Shipping PAN India
// import AutorenewIcon from "@mui/icons-material/Autorenew";          // 14 Days Replacement
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";    // 2 Years Warranty

const usps = [
  {
    icon: <BuildIcon className="text-primary text-4xl" />,
    label: "Free Installation",
    // (Google “Material Icon” equivalent: <Icon>build</Icon>)
  },
  {
    icon: <LocalShippingIcon className="text-primary text-4xl" />,
    label: "Free Shipping PAN India",
    // (Google “Material Icon” equivalent: <Icon>local_shipping</Icon>)
  },
  {
    icon: <VerifiedUserIcon className="text-primary text-4xl" />,
    label: "2 Years Warranty",
    // (Google “Material Icon” equivalent: <Icon>verified_user</Icon>)
  },
];

export default function PluginLogos() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6">
      {usps.map((usp) => (
        <div key={usp.label} className="flex flex-col items-center text-center">
          <div>{usp.icon}</div>
          <span className="text-sm font-medium mt-2">{usp.label}</span>
        </div>
      ))}
    </div>
  );
}

// export default PluginLogos;
