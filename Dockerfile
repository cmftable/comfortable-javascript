FROM node:26-bookworm-slim

WORKDIR /workspace

# Keep image lean but reproducible for CI/local runs
ENV CI=true

CMD ["bash"]
