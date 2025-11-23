import React from "react";
import { Helmet } from "react-helmet";

const containerStyle: React.CSSProperties = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    fontFamily: "Inter, Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    color: "#222",
    padding: 24,
    boxSizing: "border-box",
};

const codeStyle: React.CSSProperties = {
    fontSize: 96,
    fontWeight: 700,
    margin: 0,
    lineHeight: 1,
    color: "#e11d48", // red-600
};

const titleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: 20,
    fontWeight: 600,
};

const descStyle: React.CSSProperties = {
    margin: 0,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    maxWidth: 520,
};

const linkStyle: React.CSSProperties = {
    display: "inline-block",
    marginTop: 12,
    padding: "8px 14px",
    background: "#2563eb", // blue-600
    color: "#fff",
    textDecoration: "none",
    borderRadius: 6,
    fontWeight: 600,
};

const Page404: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>404 - Page Not Found</title>
                <meta name="description" content="The page you are looking for does not exist." />
            </Helmet>
            <main style={containerStyle} role="main" aria-labelledby="page-404-title">
                <p style={codeStyle}>404</p>
                <h1 id="page-404-title" style={titleStyle}>
                    Page not found
                </h1>
                <p style={descStyle}>
                    The page you are looking for doesn't exist or has been moved. Check the URL
                    or go back to the homepage.
                </p>
                <a href="/" style={linkStyle}>
                    Go to homepage
                </a>
            </main>
        </>
    );
};

export default Page404;