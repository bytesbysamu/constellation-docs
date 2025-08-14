---
sidebar_position: 15
---

# 🤖 AI & Embeddings Foundation

## Current State

### Done
- RevenueCat mobile IAP integration
- Stripe web payments + unified subscription system
- Auth, email, CI/CD, SQLite, i18n baseline
- Complete payment foundation (web + mobile)

### Missing
- Ollama integration for local AI inference
- pgvector for vector storage and similarity search
- Business-agnostic AI service layer
- Embedding generation and storage pipeline

---

## Critical Path

### 1. Ollama Integration
- [ ] Add Ollama client to backend
- [ ] Create AI service for text generation
- [ ] Test local model inference (Llama2, Mistral)
- [ ] Implement fallback to cloud AI if needed

### 2. pgvector Setup
- [ ] Add pgvector extension to PostgreSQL
- [ ] Create embedding storage tables
- [ ] Add vector similarity search endpoints
- [ ] Test embedding storage and retrieval

### 3. AI Service Layer
- [ ] Create business-agnostic AI service
- [ ] Implement embedding generation pipeline
- [ ] Add text-to-vector conversion
- [ ] Build similarity search API

---

## Execution Plan

**Week 1** – Ollama integration + local AI testing  
**Week 2** – pgvector setup + embedding storage  
**Week 3** – AI service layer + similarity search  
**Week 4** – Testing + fork repos for CBT-Buddy  

---

## Required Config

### Backend
```
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2:7b
POSTGRES_VECTOR_EXTENSION=pgvector
EMBEDDING_MODEL=text-embedding-ada-002
```

### Infrastructure
```
PostgreSQL 15+ with pgvector extension
Ollama running locally with models
Vector storage tables for embeddings
```

---

## Success Criteria

- [ ] Ollama generates text locally without cloud dependency
- [ ] pgvector stores and retrieves embeddings efficiently
- [ ] AI service handles text generation and embedding
- [ ] Similarity search returns relevant results
- [ ] Ready to fork repos and start CBT-Buddy domain logic

---

## Testing Checklist

### AI Generation
- [ ] Ollama generates coherent text responses
- [ ] Fallback to cloud AI works if local fails
- [ ] AI service handles different model types

### Vector Operations
- [ ] Embeddings generate and store correctly
- [ ] Similarity search finds relevant content
- [ ] Vector operations perform within acceptable latency

---

## Implementation Notes

### Backend Changes
- Add Ollama client dependency
- Create AI service with model abstraction
- Add pgvector tables for embeddings
- Implement vector similarity search

### Database Changes
- Enable pgvector extension
- Create embeddings table with vector column
- Add indexes for similarity search performance

---

## Next Phase: CBT-Buddy Domain Logic

Once AI foundation is complete:

1. **Fork repos** for CBT-Buddy development
2. **Implement CBT-specific AI prompts**
3. **Build therapy worksheet generation**
4. **Create progress tracking with embeddings**
5. **Deploy domain-specific AI features**

**Status**: 8/8 foundation complete (100%)  
**Focus**: AI + embeddings foundation  
**Timeline**: 4 weeks  
**Risk**: Low (building on solid foundation)

---

## Code Exploration Findings

### Current Backend Architecture
- **Spring Boot 3.2.12** with Java 21
- **PostgreSQL 15.1** via Docker Compose
- **JPA/Hibernate** with Flyway migrations
- **Existing modules**: `common/`, `user/`
- **Current database**: Users, roles, auth tokens (V1, V2 migrations)

### AI Implementation Plan - Detailed Structure

#### **Files to Add (Complete New Structure)**

##### **1. AI Service Layer - NEW DIRECTORY**
- `common/ai/service/AiService.java` - Main AI service interface
- `common/ai/service/AiServiceImpl.java` - Implementation with Ollama integration
- `common/ai/service/EmbeddingService.java` - Embedding generation service
- `common/ai/service/EmbeddingServiceImpl.java` - Implementation
- `common/ai/client/OllamaClient.java` - HTTP client for Ollama
- `common/ai/client/CloudAiClient.java` - Fallback cloud AI client
- `common/ai/model/AiRequest.java` - AI request DTOs
- `common/ai/model/AiResponse.java` - AI response DTOs
- `common/ai/model/EmbeddingRequest.java` - Embedding request DTOs
- `common/ai/model/EmbeddingResponse.java` - Embedding response DTOs

##### **2. Vector Storage Layer - NEW DIRECTORY**
- `common/ai/domain/Embedding.java` - JPA entity for embeddings
- `common/ai/domain/EmbeddingRepository.java` - Repository interface
- `common/ai/domain/VectorSearchResult.java` - Search result DTO
- `common/ai/service/VectorSearchService.java` - Vector similarity search
- `common/ai/service/VectorSearchServiceImpl.java` - Implementation

##### **3. Configuration & Controllers - NEW DIRECTORY**
- `common/ai/config/AiConfiguration.java` - AI service configuration
- `common/ai/controller/AiController.java` - REST endpoints for AI operations
- `common/ai/controller/EmbeddingController.java` - Embedding endpoints

##### **4. Database Migrations**
- `V3__add_pgvector_extension.sql` - Enable pgvector extension
- `V4__create_embeddings_table.sql` - Create embeddings table with vector column

#### **Files to Modify**

##### **1. Dependencies**
- `build.gradle` - Add Ollama client, pgvector dependencies
- `docker-compose.yml` - Add Ollama service, update PostgreSQL with pgvector

##### **2. Configuration**
- `application.yml` - Add AI service configuration properties
- `.env.example` - Add AI-related environment variables

##### **3. Existing Structure**
- `SpringularApplication.java` - Add AI service component scanning
- `common/config/` - Add AI configuration beans

### **High-Level Architecture Changes**

#### **1. Database Layer**
- Enable pgvector extension in PostgreSQL
- Create embeddings table with vector column type
- Add vector similarity search indexes

#### **2. Service Layer - COMPLETELY NEW**
- Abstract AI service interface supporting multiple providers
- Ollama integration for local inference
- Cloud AI fallback mechanism
- Embedding generation pipeline
- Vector similarity search implementation

#### **3. API Layer - COMPLETELY NEW**
- REST endpoints for text generation
- REST endpoints for embedding generation
- Vector similarity search API
- Health check endpoints for AI services

#### **4. Infrastructure**
- Add Ollama container to Docker Compose
- Update PostgreSQL container to include pgvector
- Environment variable configuration for AI services

### **Key Design Decisions**

1. **Complete New Module**: Building AI capabilities from scratch as a new module
2. **Service Abstraction**: Business-agnostic AI service layer that can be extended for CBT-Buddy
3. **Provider Flexibility**: Support for both local (Ollama) and cloud AI providers
4. **Vector Storage**: PostgreSQL + pgvector for efficient similarity search
5. **Fallback Strategy**: Local AI first, cloud AI as backup
6. **Scalability**: Design for future domain-specific AI features

### **Implementation Phases**

#### **Phase 1: Foundation (Week 1)**
- Create entire `common/ai/` directory structure
- Add dependencies and configuration
- Implement Ollama client

#### **Phase 2: Vector Storage (Week 2)**
- Database migrations for pgvector
- Embedding entity and repository
- Basic vector operations

#### **Phase 3: AI Services (Week 3)**
- Text generation service
- Embedding generation service
- Vector similarity search

#### **Phase 4: Integration & Testing (Week 4)**
- REST controllers
- Service integration
- Testing and validation

### **Current Codebase Advantages**
- Clean Spring Boot architecture with proper separation of concerns
- Existing user authentication and payment systems provide solid foundation
- Docker Compose setup makes infrastructure changes straightforward
- Flyway migrations ensure database schema versioning
- JPA/Hibernate patterns already established for new entities

---

## **Implementation Strategy: Ollama → Service → pgvector**

### **Phase 1: Ollama Integration**

#### **Infrastructure Approach**
- **Docker Strategy**: Add Ollama as a new service in the existing docker-compose.yml, using the official ollama/ollama image
- **Networking**: Leverage the existing constellation-network to allow the Spring Boot backend to communicate with Ollama
- **Environment Management**: Add Ollama-specific variables to the existing .env pattern, following the same structure as Stripe and other services

#### **Backend Integration Strategy**
- **Dependency Management**: Extend the existing build.gradle with HTTP client dependencies, following the same pattern as Stripe integration
- **Package Structure**: Create the AI package under common/ following the existing module pattern (like common/stripe, common/revenuecat)
- **Client Pattern**: Implement OllamaClient similar to how other external service clients are structured in the codebase

#### **Communication Strategy**
- **HTTP Client**: Use Spring's WebClient (already in the stack) to communicate with Ollama's REST API
- **Error Handling**: Follow the existing exception handling patterns used in UserService and other services
- **Configuration**: Use the existing configuration pattern with @ConfigurationProperties for Ollama settings

### **Phase 2: AI Service Layer**

#### **Service Architecture Strategy**
- **Interface Pattern**: Follow the existing service pattern (like UserService interface + UserServiceImpl)
- **Dependency Injection**: Use the existing Spring Boot patterns for service registration and injection
- **Exception Handling**: Extend the existing exception hierarchy for AI-specific errors

#### **API Design Strategy**
- **Controller Pattern**: Follow the existing UserController pattern with proper request/response DTOs
- **Validation**: Use the existing validation patterns with @Valid annotations
- **Security**: Integrate with the existing JWT authentication system

#### **Integration Strategy**
- **Component Scanning**: Extend the existing SpringularApplication to include the AI package
- **Health Checks**: Add AI service health to the existing actuator health endpoint
- **Logging**: Use the existing logback configuration and logging patterns

### **Phase 3: pgvector Setup**

#### **Database Strategy**
- **Migration Pattern**: Follow the existing Flyway migration pattern (V1, V2) with V3 for pgvector extension and V4 for embeddings table
- **Entity Pattern**: Create Embedding entity following the existing User entity pattern with JPA annotations
- **Repository Pattern**: Extend the existing repository pattern with JpaRepository

#### **Vector Operations Strategy**
- **Service Layer**: Create VectorSearchService following the existing service pattern
- **Performance**: Use the existing database connection pooling and add vector-specific indexes
- **Integration**: Wire vector operations into the existing AI service layer

### **Overall Implementation Philosophy**

#### **Pattern Consistency**
- **Follow Existing**: Every new component should mirror the existing patterns in the codebase
- **Extend Don't Replace**: Build on top of existing infrastructure rather than creating parallel systems
- **Configuration First**: Use the existing configuration patterns for all new services

#### **Integration Strategy**
- **Gradual Addition**: Add each component incrementally, testing integration at each step
- **Existing Infrastructure**: Leverage the current Docker setup, database connections, and Spring Boot configuration
- **Error Handling**: Extend the existing exception and error handling patterns

#### **Testing Approach**
- **Component Testing**: Test each new component in isolation first
- **Integration Testing**: Test with existing services using the existing test patterns
- **End-to-End**: Validate the complete flow using the existing health check and monitoring patterns

### **Implementation Order Rationale**

#### **Why Ollama First?**
- **Immediate Validation**: Get AI working locally before database complexity
- **Foundation Testing**: Validate AI capabilities without vector storage dependencies
- **User Experience**: Demonstrate AI functionality early in the development cycle

#### **Why Service Layer Second?**
- **Architecture Validation**: Ensure AI service patterns integrate properly with existing system
- **API Design**: Define interfaces before implementing storage layer
- **Testing Strategy**: Test AI logic independently of vector operations

#### **Why pgvector Last?**
- **Complexity Management**: Add vector capabilities once AI foundation is solid
- **Performance Optimization**: Focus on vector operations after basic AI functionality works
- **Integration Testing**: Test complete AI + vector pipeline at the end

This strategy ensures we're building the AI foundation as a natural extension of the existing system rather than a separate parallel implementation.

---

## **Phase 1: Ollama Integration with LangChain4j - Detailed Implementation Plan**

### **Day 1: Infrastructure Foundation**

#### **1.1 Docker Compose Updates**
- **File**: `backend/docker-compose.yml`
- **Action**: Add Ollama service after the existing services
- **Configuration**:
  - Use `ollama/ollama:latest` image
  - Expose port 11434 (Ollama's default)
  - Add to existing constellation-network
  - Mount volume for model persistence
  - Add health check for Ollama service

#### **1.2 Environment Configuration**
- **File**: `backend/.env.example`
- **New Variables**:
  - `OLLAMA_BASE_URL=http://localhost:11434`
  - `OLLAMA_MODEL=llama2:7b`
  - `OLLAMA_TIMEOUT=30000`
  - `OLLAMA_MAX_TOKENS=2048`
- **Pattern**: Follow existing Stripe/SendGrid variable structure

#### **1.3 Infrastructure Testing**
- **Action**: Start Docker services
- **Validation**: 
  - Ollama container starts successfully
  - Backend can reach Ollama on port 11434
  - Network connectivity between services works

### **Day 2: LangChain4j Dependencies & Structure**

#### **2.1 Dependencies Update**
- **File**: `backend/server/build.gradle`
- **Additions**:
  - `langchain4j-ollama` - Core Ollama integration
  - `langchain4j-core` - Core LangChain4j functionality
  - `langchain4j-spring-boot-starter` - Spring Boot integration
  - `langchain4j-embeddings-all-minilm-l6-v2` - Default embedding model
- **Pattern**: Follow existing dependency structure

#### **2.2 Package Structure Creation**
- **Directory**: `backend/server/src/main/java/com/saas/springular/common/ai/`
- **Subdirectories**:
  - `config/` - LangChain4j configuration beans
  - `model/` - DTOs and request/response objects
  - `service/` - Business logic services using LangChain4j
  - `prompt/` - Prompt templates and management

#### **2.3 LangChain4j Configuration Foundation**
- **File**: `common/ai/config/LangChain4jConfiguration.java`
- **Purpose**: Configure LangChain4j beans and Ollama integration
- **Beans**:
  - `OllamaChatModel` - Text generation model
  - `EmbeddingModel` - Text embedding model
  - `ChatMemoryStore` - Conversation memory
  - `PromptTemplate` - Reusable prompt templates

### **Day 3: Core LangChain4j Integration**

#### **3.1 Chat Model Configuration**
- **File**: `common/ai/config/OllamaChatModelConfig.java`
- **Purpose**: Configure Ollama chat model with LangChain4j
- **Configuration**:
  - Model name and parameters
  - Temperature and sampling settings
  - Timeout and retry settings
  - Fallback configuration

#### **3.2 Embedding Model Configuration**
- **File**: `common/ai/config/EmbeddingModelConfig.java`
- **Purpose**: Configure embedding model for vector operations
- **Options**:
  - Use Ollama embeddings if available
  - Fallback to local embedding model
  - Embedding dimension configuration

#### **3.3 Prompt Template Management**
- **File**: `common/ai/prompt/PromptTemplateManager.java`
- **Purpose**: Manage reusable prompt templates
- **Features**:
  - Template loading from resources
  - Variable substitution
  - Template versioning
  - Domain-specific prompt collections

### **Day 4: Service Layer with LangChain4j**

#### **4.1 AI Service Interface**
- **File**: `common/ai/service/AiService.java`
- **Purpose**: Business logic abstraction for AI operations
- **Methods**:
  - `generateText(String prompt, AiGenerationOptions options)`
  - `generateTextWithMemory(String prompt, String sessionId)`
  - `generateEmbeddings(String text)`
  - `getAvailableModels()`
  - `healthCheck()`

#### **4.2 AI Service Implementation**
- **File**: `common/ai/service/AiServiceImpl.java`
- **Dependencies**: Inject LangChain4j models and services
- **LangChain4j Integration**:
  - Use `OllamaChatModel` for text generation
  - Use `EmbeddingModel` for embeddings
  - Use `ChatMemoryStore` for conversation context
  - Use `PromptTemplate` for structured prompts

#### **4.3 Advanced AI Features**
- **Conversation Memory**: Maintain chat context across requests
- **Prompt Chaining**: Chain multiple prompts for complex tasks
- **Response Streaming**: Support for streaming responses
- **Model Switching**: Switch between different Ollama models

### **Day 5: LangChain4j Advanced Features**

#### **5.1 Tool Integration**
- **File**: `common/ai/tool/` (new directory)
- **Purpose**: Define custom tools for LangChain4j
- **Tools**:
  - `DatabaseQueryTool` - Query database information
  - `FileReadTool` - Read file contents
  - `WebSearchTool` - Search web for information
  - `CalculatorTool` - Mathematical operations

#### **5.2 Agent Framework**
- **File**: `common/ai/agent/AiAgent.java`
- **Purpose**: Create AI agents using LangChain4j
- **Features**:
  - Tool selection and execution
  - Reasoning and planning
  - Multi-step task execution
  - Error recovery and fallbacks

#### **5.3 RAG (Retrieval Augmented Generation)**
- **File**: `common/ai/rag/RagService.java`
- **Purpose**: Implement RAG capabilities
- **Components**:
  - Document ingestion and chunking
  - Vector similarity search
  - Context-aware text generation
  - Source attribution

### **Day 6: Integration & Testing**

#### **6.1 Component Registration**
- **File**: `SpringularApplication.java`
- **Action**: Add component scanning for AI package
- **Pattern**: Follow existing package scanning structure

#### **6.2 Health Check Integration**
- **File**: `common/ai/service/AiHealthIndicator.java`
- **Purpose**: Integrate with Spring Boot Actuator health endpoint
- **Checks**: 
  - Ollama connectivity
  - LangChain4j model availability
  - Tool and agent health
- **Pattern**: Follow existing health check implementations

#### **6.3 Testing Strategy**
- **Unit Tests**: Test LangChain4j integration
- **Integration Tests**: Test AI service with real Ollama
- **Agent Tests**: Test tool execution and reasoning
- **RAG Tests**: Test document retrieval and generation

### **Day 7: Validation & Optimization**

#### **7.1 Performance Optimization**
- **Model Loading**: Optimize model loading and caching
- **Memory Management**: Configure conversation memory limits
- **Response Time**: Optimize prompt processing and generation
- **Resource Usage**: Monitor CPU and memory consumption

#### **7.2 Error Handling & Fallbacks**
- **Model Failures**: Handle Ollama model crashes
- **Network Issues**: Handle connectivity problems
- **Tool Failures**: Graceful degradation when tools fail
- **Memory Issues**: Handle conversation memory overflow

#### **7.3 Monitoring & Observability**
- **Metrics**: Track request/response times, success rates
- **Logging**: Structured logging for AI operations
- **Tracing**: Trace request flow through LangChain4j
- **Alerts**: Monitor for AI service degradation

### **Success Criteria for Phase 1 with LangChain4j**

#### **Infrastructure**
- [ ] Ollama container starts and runs stably
- [ ] LangChain4j successfully connects to Ollama
- [ ] All required dependencies are properly configured

#### **Core Functionality**
- [ ] Text generation works with Ollama models
- [ ] Embedding generation functions properly
- [ ] Prompt templates can be loaded and used
- [ ] Conversation memory maintains context

#### **Advanced Features**
- [ ] Tools can be executed by AI agents
- [ ] RAG pipeline works for document retrieval
- [ ] Multi-step reasoning functions properly
- [ ] Error handling and fallbacks work correctly

#### **Integration**
- [ ] AI services integrate with existing Spring Boot architecture
- [ ] Health checks report proper status
- [ ] Configuration follows existing patterns
- [ ] Logging and monitoring work correctly

### **Key Benefits of LangChain4j Approach**

1. **Production Ready**: LangChain4j is designed for production use
2. **Rich Ecosystem**: Access to tools, agents, and RAG capabilities
3. **Spring Integration**: Native Spring Boot support
4. **Extensibility**: Easy to add custom tools and agents
5. **Standards**: Follows LangChain patterns and best practices
6. **Performance**: Optimized for Java/Spring environments

This approach gives us a much more robust and feature-rich AI foundation compared to building custom Ollama integration from scratch.

---

## 🎯 **Day 3: Core LangChain4j Integration - COMPLETED SUCCESSFULLY! ✅**

### **Summary**: Service implementation, comprehensive testing, and architecture decisions completed

#### **✅ Achievements**
- **AiServiceImpl**: Full LangChain4j integration with text generation, embeddings, health checks
- **Testing**: 13/13 tests passing, minimal mocking, real objects where possible
- **Architecture**: DTOs directly in service, no complex mapping, custom exceptions with retryable flags

#### **🔧 Technical Details**
- **Service Layer**: Clean interface with `generateText()`, `generateEmbeddings()`, `isHealthy()`, `getModelInfo()`
- **Testing Strategy**: Mock external dependencies only, use real LangChain4j objects internally
- **Error Handling**: `AiServiceException` with business context, error codes, and retryable flags

#### **📊 Test Results**
```
BUILD SUCCESSFUL in 5s
13 tests completed, 0 failed
```
**Coverage**: Text Generation (4), Embeddings (1), Health Checks (3), Configuration (1), Utility Methods (4)

#### **🎯 Key Decisions**
1. **Architecture**: Use generated DTOs directly in service layer
2. **Testing**: Comprehensive testing with minimal mocking
3. **Error Handling**: Custom exceptions with business context
4. **Service Design**: Service handles DTO creation and business logic

#### **🚀 Next Steps**
- **Immediate**: Controller testing, integration testing, performance testing
- **Phase 2**: pgvector integration, embedding storage, similarity search, RAG pipeline

#### **💡 Lessons**
- **What Worked**: OpenAPI-first approach, LangChain4j integration, pragmatic testing
- **To Improve**: More granular error types, externalized configuration, early monitoring

**🎉 Status: 3/7 days completed successfully! Ready for Day 4 (Service Layer with LangChain4j)**
