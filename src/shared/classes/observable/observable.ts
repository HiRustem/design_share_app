type Listener = () => void;

class Observable<EmitType extends string> {
  private listeners: Map<EmitType, Set<Listener>> = new Map();

  subscribe(type: EmitType, listener: Listener): () => void {
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

  emit(type: EmitType): void {
    if (this.listeners.get(type)) {
      for (const listener of this.listeners.get(type)!) listener();
    }
  }
}

export default Observable;
