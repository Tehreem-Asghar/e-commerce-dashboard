import { Home,  Settings , ListOrdered , Package , PlusIcon,  BarChart2 ,LogOut ,Users  } from "lucide-react"



import { Style_Script } from "next/font/google";
import { Josefin_Sans } from "next/font/google";



const josefinSans = Josefin_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
  });

 

  const styleScript = Style_Script({
    subsets: ["latin"],
    weight: "400",
  });
  

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";


// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard/",
    icon: Home,
  },
  {
    title: "orders",
    url: "/dashboard/orders",
    icon: ListOrdered,
  },
  {
    title: "Product Stock",
    url: "/dashboard/stock",
    icon: Package ,
  },
  {
    title: "Add product",
    url: "/dashboard/add-product",
    icon: PlusIcon,
  },
  {
    title: "customers",
    url: "/dashboard/customers",
    icon: Users,
  },
  {
    title : "Analytics",
    url : "/dashboard/analytics",
    icon :   BarChart2 ,
  },
  {
    title: "Settings",
    url: "/dashboard/setting",
    icon: Settings,
  },
  // {
  //   title: "Logout",
  //   url: "/login",
  //   icon: LogOut,
  // },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-gradient-to-br hover:from-blue-800 from-blue-600 hover:to-blue-600 to-blue-800 text-white   border-r-pink-400 shadow-lg  border-r-2 ">
        <SidebarGroup>
          {/* <SidebarGroupLabel  className="text-white  bg-[#FB2E86] h-[80px] text-xl">Admin Dashboard</SidebarGroupLabel>
         */}
         <SidebarGroupLabel className={`  ${josefinSans.className} text-white mt-4 mb-8 text-2xl font-bold  grid` }>
  Admin Dashboard 
  <p className="text-[14px] text-center ">E-commerce Managment</p>
</SidebarGroupLabel>
<p className="my-2">Menue</p>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {/* <button className="">Login</button> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
