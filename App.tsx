import React from "react";
import "./firebase/firebaseConfig";
import { QueryClient, QueryClientProvider } from "react-query";
import AppProvider from "./src/context/AppContext";
import AppEntry from "./AppEntry";

export default function App() {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
	});

	return (
		<QueryClientProvider client={queryClient}>
			<AppProvider>
				<AppEntry />
			</AppProvider>
		</QueryClientProvider>
	);
}
