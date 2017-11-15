mounted() {
        document.addEventListener('touchstart', (eve) => {
          const target = eve.srcElement
          const isContained = target.parentNode.classList.contains('letters')
          if (isContained) {
            const moveFn = (e) => {
              const hasEle = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
              if (hasEle) {
                this.toTheAnchor(hasEle.innerText)
              }
            }
            const endFn = (eve) => {
              // target.parentNode.style.backgroundColor = 'transparent'
              document.removeEventListener('touchmove', moveFn)
              document.removeEventListener('touchend', endFn)
            }
            // target.parentNode.style.backgroundColor = '#ececec'
            eve.preventDefault()
            document.addEventListener('touchmove', moveFn)
            document.addEventListener('touchend', endFn)
          } else {
            return false
          }
        })
      }