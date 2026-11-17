import { Component, type ReactNode } from 'react';
type Props = { children: ReactNode }; type State = { failed: boolean };
export class ErrorBoundary extends Component<Props, State> { state: State = { failed: false }; static getDerivedStateFromError(): State { return { failed: true }; } componentDidCatch(): void {} render() { return this.state.failed ? <main className="fatal-error" role="alert">Something went wrong. Please refresh the page.</main> : this.props.children; } }
