"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    FB: {
      init: (params: {
        appId: string;
        cookie: boolean;
        xfbml: boolean;
        version: string;
      }) => void;
      login: (
        callback: (response: {
          authResponse?: {
            accessToken: string;
          };
        }) => void,
        params: { scope: string },
      ) => void;
    };
    fbAsyncInit: () => void;
  }
}

export default function FacebookLogin() {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!process.env.NEXT_PUBLIC_FACEBOOK_APP_ID) {
      setHasError(true);
      return;
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? "",
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });
    };

    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    script.id = "facebook-jssdk";

    if (!document.getElementById("facebook-jssdk")) {
      document.body.appendChild(script);
    }

    return () => {
      const scriptElement = document.getElementById("facebook-jssdk");
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, []);

  const handleLogin = () => {
    if (typeof window === "undefined" || !window.FB) return;

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          const shortLivedToken = response.authResponse.accessToken;
          window.location.href = `/api/instagram/get-token?slt=${shortLivedToken}`;
        } else {
          console.error("Error logging in to Facebook");
        }
      },
      {
        scope:
          "pages_show_list,ads_management,business_management,instagram_basic,instagram_manage_comments,instagram_manage_insights,instagram_content_publish,pages_read_engagement,pages_manage_posts",
      },
    );
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        {hasError ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Error: NEXT_PUBLIC_FACEBOOK_APP_ID is not configured. Please
                  set up the environment variables.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Connect with Instagram
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                To manage your posts, we need you to connect with your Facebook
                account
              </p>
            </div>
            <div className="mt-8">
              <button
                onClick={handleLogin}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1877F2] hover:bg-[#166fe5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877F2]"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-[#ffffff] group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </span>
                Login with Facebook
              </button>
            </div>
            <div className="mt-6 text-center text-xs text-gray-500">
              <p>
                By continuing, you agree to grant us access to your Instagram
                account information for content management
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
