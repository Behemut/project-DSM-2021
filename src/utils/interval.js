
export function interval(ms) {
    return (new Promise(resolve => setInterval(resolve, ms))
    
    );
  }