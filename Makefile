NPM_RUN = npm run

CHROME_PATH = $(shell which chromium || which chrome)

NODE_PATH = $(shell which node || which nodejs)

.PHONY: clean
clean: 
	@$(NPM_RUN) clean:dll
	@$(NPM_RUN) clean:dist
	@$(NPM_RUN) clean:aot

.PHONY: clean-all
clean-all:
	@$(NPM_RUN) clean

.PHONY: build
build:
	@$(NPM_RUN) build

.PHONY: build-prod
build-prod:
	@$(NPM_RUN) build:prod

.PHONY: build-aot-prod
build-aot-prod:
	@$(NPM_RUN) build:aot:prod

.PHONY: development
development:
	@$(NPM_RUN) server:dev:hmr

.PHONY: install
install:
	@npm install

.PHONY: test
test:
	@CHROME_BIN="$(CHROME_PATH)" $(NPM_RUN) test

.PHONY: lint
lint:
	@$(NPM_RUN) lint

.PHONY: serve
serve:
	@$(NODE_PATH) index.js

.PHONY: check-outdated
check-outdated:
	@npm outdated --depth=0 || true
