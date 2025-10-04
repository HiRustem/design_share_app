type Listener = () => void;

class ObservableStatic {
  private static listeners: Map<string, Set<Listener>> = new Map();

  static subscribe(type: string, listener: Listener): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }

    this.listeners.get(type)!.add(listener);

    return () => {
      this.listeners.get(type)?.delete(listener);

      if (this.listeners.get(type)?.size === 0) {
        this.listeners.delete(type);
      }
    };
  }

  static emit(type: string): void {
    if (this.listeners.get(type)) {
      for (const listener of this.listeners.get(type)!) listener();
    }
  }
}

export default ObservableStatic;
