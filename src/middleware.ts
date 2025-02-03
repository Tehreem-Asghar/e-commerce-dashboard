import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Allow access to the login and signup pages without checking for a session
  if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup") {
    if (session) {
      // If the user is already logged in, redirect them to the dashboard
      const dashboardUrl = new URL("/", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
    // If the user is not logged in, allow them to access the login/signup page
    return NextResponse.next();
  }

  // If there is no session and the user is not on the login/signup page, redirect them to the login page
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If there is a session, allow the user to proceed
  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/dashboard","/dashboard/add-product", "/dashboard/orders", "/dashboard/products/:path*", "/dashboard/stock", "/login" ,"/signup", "/dashboard/setting" , "/dashboard/analytics" , "/dashboard/customers"],
};





// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { NextRequest } from "next/server";

// export const middleware = async (request: NextRequest) => {
//   const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

//   console.log("Session:", session); // Debugging
//   console.log("Pathname:", request.nextUrl.pathname); // Debugging

//   // If the user is on the login page, allow them to proceed without checking for a session
//   if (request.nextUrl.pathname === "/login") {
//     console.log("User is on login page, allowing access."); // Debugging
//     return NextResponse.next();
//   }

//   // If there is no session and the user is not on the login page, redirect them to the login page
//   if (!session) {
//     console.log("No session found, redirecting to login."); // Debugging
//     const loginUrl = new URL("/login", request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // If there is a session, allow the user to proceed
//   console.log("Session found, allowing access."); // Debugging
//   return NextResponse.next();
// };

// export const config = {
//   matcher: ["/", "/add-product", "/orders", "/products", "/stock", "/login" ,"/signup", "/setting" , "/analytics" , "customers"],
// };








// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { NextRequest } from "next/server";

// export const middleware = async (request: NextRequest) => {
//   const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

//   console.log("Session:", session); // Debugging

//   if (!session) {
//     const loginUrl = new URL("/login", request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// };

// export const config = {
//   matcher: ["/", "/add-product", "/orders", "/products", "/stock"],
// };





















// import { NextRequest, NextResponse } from "next/server";


// export const middleware = (request: NextRequest) => {
//     const cookie = request.cookies.get("next-auth.csrf-token")?.value;
//     const deployedCookie = request.cookies.get("__Secure-next-auth.session-token")?.value;
  
//     // Log cookie values for debugging
//     console.log("Cookie:", cookie);
//     console.log("DeployedCookie:", deployedCookie);
  
//     // Check if both cookies exist
//     if (!cookie || !deployedCookie) {
//       const loginUrl = new URL("/login", request.url);
//       return NextResponse.redirect(loginUrl);
//     }
  
//     return NextResponse.next();
//   };
  
//   export const config = {
//       matcher: [ "/", "/add-product", "/orders", "/products"  , "/stock" ],
//     };
    

