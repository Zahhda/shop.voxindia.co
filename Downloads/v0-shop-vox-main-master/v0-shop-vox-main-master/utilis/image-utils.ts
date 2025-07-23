// Function to preload images
export function preloadImages(imagePaths: string[]): void {
    imagePaths.forEach((path) => {
      const img = new Image()
      img.src = path
    })
  }
  
  export async function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
        })
      }
      img.src = src
    })
  }
  
