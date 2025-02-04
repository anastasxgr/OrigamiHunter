class Bird {
  constructor(id, config) {
    this.id = id;
    this.config = config;
    this.item = document.createElement("div");
    this.item.classList.add("bird");

    this.size =
      Math.floor(Math.random() * (config.maxSize - config.minSize + 1)) +
      config.minSize;
    this.item.style.width = `${this.size}px`;
    this.item.style.height = `${this.size}px`;

    this.xPosition = Math.floor(
      Math.random() * (config.containerWidth - this.size)
    );
    this.yPosition = Math.floor(
      Math.random() * (config.containerHeight - this.size)
    );
    this.item.style.left = `${this.xPosition}px`;
    this.item.style.top = `${this.yPosition}px`;

    /**
     *  Random movements {X,Y,Speed}
     */
    this.randomXMovement = Math.floor(Math.random() * 500) + 100;
    this.randomYMovement = Math.floor(Math.random() * 500) + 100;
    this.randomDuration = Math.floor(Math.random() * 5) + config.speed;

    this.item.setAttribute("data-x-move", this.randomXMovement);
    this.item.setAttribute("data-y-move", this.randomYMovement);
    this.item.setAttribute("data-duration", this.randomDuration);

    this.item.style.animation = `moveAround-${this.id} ${this.randomDuration}s linear infinite`;

    this.item.addEventListener("click", () => this.hitbird());

    this.createKeyframes();
  }

  createKeyframes() {
    const styleSheet = document.styleSheets[0];
    const animationKeyframes = `
            @keyframes moveAround-${this.id} {
              0% {
                transform: translate(0, 0);
              }
              25% {
                transform: translate(${this.randomXMovement}px, ${this.randomYMovement}px);
              }
              50% {
                transform: translate(-${this.randomXMovement}px, ${this.randomYMovement}px);
              }
              75% {
                transform: translate(${this.randomXMovement}px, -${this.randomYMovement}px);
              }
              100% {
                transform: translate(0, 0);
              }
            }
          `;
    styleSheet.insertRule(animationKeyframes, styleSheet.cssRules.length);
  }

  hitbird() {
    this.item.style.display = "none";
  }

  addToContainer(container) {
    container.appendChild(this.item);
  }
}


// mount birds to container
function createBirds(config) {
  const container = document.getElementById("container");

  for (let i = 0; i < config.numberOfItems; i++) {
    const birdElement = new Bird(i, config);
    birdElement.addToContainer(container);
  }
}

createBirds(config);
